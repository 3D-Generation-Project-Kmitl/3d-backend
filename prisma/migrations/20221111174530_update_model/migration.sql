/*
  Warnings:

  - You are about to drop the column `model` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modelId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modelId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "model",
DROP COLUMN "picture",
ADD COLUMN     "modelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_modelId_key" ON "Product"("modelId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("modelId") ON DELETE RESTRICT ON UPDATE CASCADE;
