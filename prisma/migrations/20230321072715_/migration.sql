-- CreateTable
CREATE TABLE `route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaMenu` VARCHAR(100) NOT NULL,
    `pathMenu` VARCHAR(100) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;