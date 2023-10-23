-- CreateTable
CREATE TABLE `SavedDocuments` (
    `id` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
