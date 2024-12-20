-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('NORMAL', 'HARD', 'EXTREME');

-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "deluxe" BOOLEAN NOT NULL,
    "difficulty" "Difficulty",
    "bpm" DOUBLE PRECISION NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);