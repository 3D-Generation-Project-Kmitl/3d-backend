/*
  Warnings:

  - You are about to drop the column `otp_expired_at` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `token_expired_at` on the `Otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "otp_expired_at",
DROP COLUMN "token",
DROP COLUMN "token_expired_at",
ADD COLUMN     "expired_at" TIMESTAMP(3);
