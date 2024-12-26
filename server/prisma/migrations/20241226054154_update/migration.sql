/*
  Warnings:

  - You are about to drop the column `ticketType` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the `seat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `seat` DROP FOREIGN KEY `Seat_concertId_fkey`;

-- DropForeignKey
ALTER TABLE `seat` DROP FOREIGN KEY `Seat_userId_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `ticketType`;

-- AlterTable
ALTER TABLE `concert` DROP COLUMN `ticketType`;

-- DropTable
DROP TABLE `seat`;
