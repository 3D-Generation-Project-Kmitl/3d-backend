/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `WalletTransaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "WalletTransaction" DROP COLUMN "isCompleted",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';
