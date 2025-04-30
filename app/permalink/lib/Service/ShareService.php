<?php

/**
 * Configurable Share Links for Nextcloud
 *
 * @copyright Copyright (C) 2022  Filip Joska <filip@joska.dev>
 *
 * @author Filip Joska <filip@joska.dev>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Permalink\Service;

use Exception as BaseException;
use OC\User\NoUserException;
use OCA\Files_Sharing\Exceptions\SharingRightsException;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Share\IManager;
use OCP\Share\IShare;
use OCP\Constants;
use TypeError as BaseTypeError;
use OCP\IL10N;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Lock\ILockingProvider;
use OCP\Lock\LockedException;

use OCP\DB\QueryBuilder\IQueryBuilder;


/***
 * Based on ShareAPIController (From Nextcloud's core app files_sharing)
 */
class ShareService {
	/** @var Node */
	private Node $lockedNode;
   
	public function __construct(
		private readonly IManager $shareManager,
		private readonly IRootFolder $rootFolder,
        private readonly IL10N $l10n,
	) {
	}

	private function getSharesIdByPath(Node $node) : array {
		$qb = \OC::$server->getDatabaseConnection()->getQueryBuilder();
		$cursor = $qb->select('id')
            ->from('share')
            ->andWhere($qb->expr()->eq('file_source', $qb->createNamedParameter($node->getId())))
            ->andWhere($qb->expr()->in('share_type', $qb->createNamedParameter([0, 1, 3], IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere($qb->expr()->in('item_type', $qb->createNamedParameter(['file', 'folder'], IQueryBuilder::PARAM_STR_ARRAY)))
            ->orderBy('id', 'ASC')
            ->executeQuery();
        $shares = $cursor->fetchAll();

        $ids = array_column($shares, 'id');
        return $ids;
	}


    public function getSharelink(string $userId, string $filePath) : IShare {
        $userFolder = $this->rootFolder->getUserFolder($userId);
        $node = $userFolder->get($filePath);
        $shares = $this->getSharesIdByPath($node);

        if (empty($shares)) {
            $share = null;
        } else {
            $share = $this->shareManager->getShareById('ocinternal:' . $shares[0]);
        }
        return $share;
    }

    public function getOrCreateSharelink(string $userId, string $filePath) : IShare {
        $share = $this->getSharelink($userId, $filePath);
        if ($share === null) {
            $share = $this->create($filePath, 3, $userId);
        }
        return $share;
    }

	private function create(?string $path, int $shareType, string $userId, string $password = ''): IShare {

		if ($shareType != IShare::TYPE_LINK) {
			// TRANSLATORS function to create link with custom share token is expecting type link (but received some other type)
			throw new OCSBadRequestException($this->l10n->t('Invalid share type'));
		}

		// Can we even share links?
		if (!$this->shareManager->shareApiAllowLinks()) {
			throw new OCSForbiddenException($this->l10n->t('Public link sharing is disabled by the administrator'));
		}

		// Verify path
		if ($path === null) {
			// TRANSLATORS function to create link received empty (null) path
			throw new OCSNotFoundException($this->l10n->t('Please specify a file or folder path'));
		}

		$userFolder = $this->rootFolder->getUserFolder($userId);
		try {
			$node = $userFolder->get($path);
		} catch (NotFoundException) {
			throw new OCSNotFoundException($this->l10n->t('Wrong path, file/folder does not exist'));
		}

		$share = $this->shareManager->newShare();
		$share->setNode($node);

		try {
			$this->lock($share->getNode());
		} catch (NotFoundException|LockedException) {
			throw new OCSNotFoundException($this->l10n->t('Could not create share'));
		}

		$permissions = Constants::PERMISSION_READ;
		// TODO: It might make sense to have a dedicated setting to allow/deny converting link shares into federated ones
		if (($permissions & Constants::PERMISSION_READ) && $this->shareManager->outgoingServer2ServerSharesAllowed()) {
			$permissions |= Constants::PERMISSION_SHARE;
		}
		$share->setPermissions($permissions);

		$share->setShareType($shareType);
		$share->setSharedBy($userId);

		// Set password
		if ($password !== '') {
			$share->setPassword($password);
		}

		// Create share in the database
		try {
			$share = $this->shareManager->createShare($share);
		} catch (GenericShareException $e) {
			$this->logger->warning('Error creating share: ' . $e->getMessage(), ['trace' => $e->getTrace()]);
			$code = $e->getCode() === 0 ? 403 : $e->getCode();
			throw new OCSException($e->getHint(), $code);
		} catch (BaseException $e) {
			$this->logger->warning('Error creating share: ' . $e->getMessage(), ['trace' => $e->getTrace()]);
			throw new OCSForbiddenException($e->getMessage(), $e);
		}

        /* $node = $share->getNode(); */
        /* $shares = $this->shareManager->getSharesByPath($node); */

		/* return $shares[0]; */
		return $share;
		/* return $this->serializeShare($share); */
	}

    private function serializeShare(IShare $share): array {
		return [
			'id' => $share->getId(),
			'share_type' => $share->getShareType(),
			'uid_owner' => $share->getSharedBy(),
			'displayname_owner' => $share->getSharedBy(),
			// recipient permissions
			'permissions' => $share->getPermissions(),
			// current user permissions on this share
			'stime' => $share->getShareTime()->getTimestamp(),
			'parent' => null,
			'expiration' => $share->getExpirationDate()?->getTimestamp(),
			'token' => $share->getToken(),
			'uid_file_owner' => $share->getShareOwner(),
			'note' => $share->getNote(),
			'label' => $share->getLabel(),
			'displayname_file_owner' => $share->getShareOwner(),
		];
	}

    	/**
	 * Lock a Node
	 *
	 * @param Node $node
	 * @throws LockedException
	 */
	private function lock(Node $node): void {
		$node->lock(ILockingProvider::LOCK_SHARED);
		$this->lockedNode = $node;
	}

	/**
	 * Cleanup the remaining locks
	 * @throws LockedException
	 */
	public function cleanup(): void {
		if (!empty($this->lockedNode)) {
			$this->lockedNode->unlock(ILockingProvider::LOCK_SHARED);
		}
	}


	private function tokenChecks(string $tokenCandidate): void {
		// Validity check
		$this->raiseIfTokenIsInvalid($tokenCandidate);

		// Unique check
		try {
			$share = $this->shareManager->getShareByToken($tokenCandidate);
			if ($this->appConfig->getAppValueBool(SettingsKey::DeleteRemovedShareConflicts->value, $this->appConstants::DEFAULT_DELETE_REMOVED_SHARE_CONFLICTS)) {
				try {
					$share->getNode();
				} catch (NotFoundException) {
					// Remove share if the file/folder does not exist
					$this->logger->debug('Conflicting token, but node does not exist. Removing conflicting share.');
					$this->shareManager->deleteShare($share);
					return;
				}
			}
			throw new TokenNotUniqueException($this->l10n->t('Token is not unique'));
		} catch (ShareNotFound) {
		}
	}

	/**
	 * @throws InvalidTokenException
	 */
	public function raiseIfTokenIsInvalid(string $token): void {
		$min_length = 10;
		/* $min_length = $this->appConfig->getAppValueInt(SettingsKey::MinTokenLength->value, $this->appConstants::DEFAULT_MIN_TOKEN_LENGTH); */

		if ($token == null || strlen($token) < $min_length) {
			throw new InvalidTokenException($this->l10n->t('Token is not long enough'));
		}

		if (strlen($token) > $this->appConstants::MAX_TOKEN_LENGTH) {
			throw new InvalidTokenException($this->l10n->t('Token cannot be longer than %1$s characters', [$this->appConstants::MAX_TOKEN_LENGTH]));
		}

		$valid = preg_match($this->appConstants::DEFAULT_VALID_TOKEN_REGEX, $token);

		if ($valid != 1) {
			throw new InvalidTokenException($this->l10n->t('Token contains invalid characters'));
		}

		$username_conflict_candidates = $this->userManager->searchDisplayName($token);
		foreach ($username_conflict_candidates as $user) {
			// Check if it is an exact match
			if ($user->getDisplayName() == $token) {
				throw new InvalidTokenException($this->l10n->t('This token cannot be used'));
			}
		}
	}


}

