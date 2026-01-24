-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "batch" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "seatNo" DROP NOT NULL;
