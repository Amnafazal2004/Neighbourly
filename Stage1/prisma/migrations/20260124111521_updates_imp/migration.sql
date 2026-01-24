/*
  Warnings:

  - You are about to drop the column `authorId` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_authorId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "Profile";
