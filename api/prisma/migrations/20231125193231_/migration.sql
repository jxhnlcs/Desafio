-- CreateTable
CREATE TABLE `Historico` (
    `historico` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `radius` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`historico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`users`) ON DELETE RESTRICT ON UPDATE CASCADE;
