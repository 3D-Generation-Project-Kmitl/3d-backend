-- CreateEnum
CREATE TYPE "ModelType" AS ENUM ('ADD', 'CREATE', 'BUY');

-- CreateTable
CREATE TABLE "Model" (
    "modelId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "type" "ModelType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("modelId")
);

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
