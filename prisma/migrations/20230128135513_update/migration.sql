/*
  Warnings:

  - You are about to drop the `OrderTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderTransaction" DROP CONSTRAINT "OrderTransaction_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderTransaction" DROP CONSTRAINT "OrderTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "WalletTransaction" DROP CONSTRAINT "WalletTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "OrderTransaction";

-- DropTable
DROP TABLE "Wallet";

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
