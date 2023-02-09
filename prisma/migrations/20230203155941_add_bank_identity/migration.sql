/*
  Warnings:

  - Added the required column `bankAccount` to the `Identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "bankAccount" VARCHAR(50) NOT NULL,
ADD COLUMN     "bankName" VARCHAR(50) NOT NULL;
