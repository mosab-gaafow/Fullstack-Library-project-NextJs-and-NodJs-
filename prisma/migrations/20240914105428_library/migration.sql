-- DropForeignKey
ALTER TABLE `bookloan` DROP FOREIGN KEY `BookLoan_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `bookloan` DROP FOREIGN KEY `BookLoan_userId_fkey`;

-- AddForeignKey
ALTER TABLE `BookLoan` ADD CONSTRAINT `BookLoan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookLoan` ADD CONSTRAINT `BookLoan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
