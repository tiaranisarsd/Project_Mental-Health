-- CreateTable
CREATE TABLE "Tinjauan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "layanan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tinjauan_pkey" PRIMARY KEY ("id")
);
