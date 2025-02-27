/*
  Warnings:

  - You are about to drop the `artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `Artist_brandId_fkey`;

-- DropTable
DROP TABLE `artist`;
