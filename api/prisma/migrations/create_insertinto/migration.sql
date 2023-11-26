-- CreateTable
use girosscep;

CREATE TABLE `User` (
    `users` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultation` (
    `consultations` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `radius` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`consultations`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`users`) ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO `Consultation` (`userId`, `cep`, `radius`)
VALUES
(1, '12345-678', 5),
(1, '54321-876', 10),
(1, '98765-432', 15),
(1, '11111-222', 8),
(1, '33333-444', 12),
(1, '55555-666', 18),
(1, '77777-888', 3),
(1, '99999-000', 7),
(1, '22222-333', 14),
(1, '44444-555', 9);