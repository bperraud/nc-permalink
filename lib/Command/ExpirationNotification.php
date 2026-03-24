<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Permalink\Command;

use OCA\Files_Sharing\OrphanHelper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IDBConnection;
use OCP\Notification\IManager as NotificationManager;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use OCP\AppFramework\Services\IAppConfig;
use OCA\Permalink\Enums\SettingsKey;

class ExpirationNotification extends Command {
        public function __construct(
                private ITimeFactory $time,
                private NotificationManager $notificationManager,
                private IDBConnection $connection,
                private ShareManager $shareManager,
                private OrphanHelper $orphanHelper,
		        private readonly IAppConfig $appConfig,
        ) {
                parent::__construct();
        }

        protected function configure() {
                $this
                        ->setName('permalink:expiration-notification')
                        ->setDescription('Notify share initiators when a share will expire the next day.');
        }

        public function execute(InputInterface $input, OutputInterface $output): int {
                //Current time
                $minTime = $this->time->getDateTime();
                $minTime->add(new \DateInterval('P1D'));
                $minTime->setTime(0, 0, 0);

                $days = (int) $this->appConfig->getAppValueString(
                    SettingsKey::FilesharingExpirationDays->value,
                    '7'
                );

                $maxTime = clone $minTime;
                $maxTime->add(new \DateInterval('P' . ($days - 1) . 'D'));
                $maxTime->setTime(23, 59, 59);

                $shares = $this->shareManager->getAllShares();
                $now = $this->time->getDateTime();

                $output->writeln('min: ' . $minTime->format('Y-m-d H:i:s'));
                $output->writeln('max: ' . $maxTime->format('Y-m-d H:i:s'));

                /** @var IShare $share */
                foreach ($shares as $share) {
                        if ($share->getExpirationDate() === null
                                || $share->getExpirationDate()->getTimestamp() < $minTime->getTimestamp()
                                || $share->getExpirationDate()->getTimestamp() > $maxTime->getTimestamp()
                                || !$this->orphanHelper->isShareValid($share->getSharedBy(), $share->getNodeId())) {
                                continue;
                        }


                        $output->writeln('notification for share ' . $share->getFullId());

                        $notification = $this->notificationManager->createNotification();
                        $notification->setApp('permalink')
                                ->setDateTime($now)
                                ->setObject('share', $share->getFullId())
                                ->setSubject('expires next week');

                        // Only send to initiator for now
                        $notification->setUser($share->getSharedBy());
                        $this->notificationManager->notify($notification);
                }
                return 0;
        }
}

