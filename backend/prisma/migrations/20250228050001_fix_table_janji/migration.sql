/*
  Warnings:

  - You are about to drop the column `Alasan_konsultasi` on the `Janji` table. All the data in the column will be lost.
  - Added the required column `alasan_konsultasi` to the `Janji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Janji" DROP COLUMN "Alasan_konsultasi",
ADD COLUMN     "alasan_konsultasi" TEXT NOT NULL;
