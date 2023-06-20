/*
  Warnings:

  - The `status` column on the `Identity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IdentityStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Identity" DROP COLUMN "status",
ADD COLUMN     "status" "IdentityStatus" NOT NULL DEFAULT 'PENDING';
