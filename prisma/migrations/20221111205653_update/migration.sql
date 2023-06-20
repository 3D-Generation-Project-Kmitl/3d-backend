-- CreateEnum
CREATE TYPE "ModelStatus" AS ENUM ('AVAILABLE', 'DELETED');

-- AlterEnum
ALTER TYPE "ProductStatus" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "status" "ModelStatus" NOT NULL DEFAULT 'AVAILABLE';
