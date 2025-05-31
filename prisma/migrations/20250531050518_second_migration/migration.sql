/*
  Warnings:

  - Added the required column `name` to the `People` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `People` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `People` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Planets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Planets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Planets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Starships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Starships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Starships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "People" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Planets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Starships" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
