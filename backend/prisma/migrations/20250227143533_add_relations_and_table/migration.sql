-- AlterTable
ALTER TABLE "Tinjauan" ADD COLUMN     "tinjauan" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edukasi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "konten" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Edukasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Janji" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "domisili" TEXT NOT NULL,
    "kategori_pengguna" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "jenis_konsultasi" TEXT NOT NULL,
    "Alasan_konsultasi" TEXT NOT NULL,

    CONSTRAINT "Janji_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Edukasi" ADD CONSTRAINT "Edukasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
