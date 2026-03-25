<?php

declare(strict_types=1);

namespace OCA\Permalink\Notification;

use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\L10N\IFactory;
use OCP\Notification\AlreadyProcessedException;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Share\IShare;
use OCP\IL10N;

use Psr\Log\LoggerInterface;

class Notifier implements INotifier {

    public function __construct(
        private IFactory $l10nFactory,
        private IManager $shareManager,
        private IRootFolder $rootFolder,
		private LoggerInterface $logger,
    ) {}

    public function getID(): string {
        return 'permalink';
    }

    public function getName(): string {
        return $this->l10nFactory->get('permalink')->t('Permalink');
    }

    public function prepare(INotification $notification, string $languageCode): INotification {
        if ($notification->getApp() !== 'permalink'
            || $notification->getSubject() !== 'expiresNextWeek') {
            throw new UnknownNotificationException();
        }

        $l = $this->l10nFactory->get('permalink', $languageCode);
        $shareId = $notification->getObjectId();
        
        $this->logger->warning('prepare notification ');

        try {
            $share = $this->shareManager->getShareById($shareId, $notification->getUser());
        } catch (ShareNotFound $e) {
            throw new AlreadyProcessedException();
        }

        try {
            $node = $share->getNode();
        } catch (NotFoundException $e) {
            throw new AlreadyProcessedException();
        }

        return $this->buildExpirationNotification($share, $notification, $l);
    }

    private function buildExpirationNotification(
        IShare $share,
        INotification $notification,
        IL10N $l
    ): INotification {

        $node = $share->getNode();
        $userFolder = $this->rootFolder->getUserFolder($notification->getUser());
        $relativePath = $userFolder->getRelativePath($node->getPath());

        $notification->setParsedSubject(
            $l->t('Share will expire soon')
        );

        $notification->setRichMessage(
            $l->t('Your share of {file} will expire soon'),
            [
                'file' => [
                    'type' => 'file',
                    'id' => (string)$node->getId(),
                    'name' => $node->getName(),
                    'path' => (string)$relativePath,
                ],
            ]
        );

        $this->logger->warning('build notification');

        return $notification;
    }
}
