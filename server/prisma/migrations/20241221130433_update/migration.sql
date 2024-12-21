/*
  Warnings:

  - You are about to alter the column `picture` on the `concert` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `image` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `fullName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `phoneNumber` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(10)`.
  - You are about to alter the column `picture` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `category` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `concert` MODIFY `picture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `product` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `updatedAt`,
    MODIFY `fullName` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(20) NOT NULL,
    MODIFY `password` VARCHAR(20) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(10) NULL,
    MODIFY `picture` VARCHAR(191) NULL;
