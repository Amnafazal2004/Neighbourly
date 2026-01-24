/*
  Warnings:

  - You are about to drop the column `batch` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `seatNo` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- DropIndex
DROP INDEX "Profile_seatNo_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "batch",
DROP COLUMN "bio",
DROP COLUMN "createdAt",
DROP COLUMN "department",
DROP COLUMN "fullName",
DROP COLUMN "profilePic",
DROP COLUMN "seatNo";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostImage";
