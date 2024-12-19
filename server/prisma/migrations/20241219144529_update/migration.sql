/*
  Warnings:

  - You are about to drop the column `price` on the `concert` table. All the data in the column will be lost.
  - Added the required column `price` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `seat` ADD COLUMN `price` INTEGER NOT NULL;
