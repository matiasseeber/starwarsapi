/*
  Warnings:

  - You are about to drop the `Films` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `People` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Species` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Starships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Films";

-- DropTable
DROP TABLE "People";

-- DropTable
DROP TABLE "Planets";

-- DropTable
DROP TABLE "Species";

-- DropTable
DROP TABLE "Starships";

-- DropTable
DROP TABLE "Vehicles";

-- CreateTable
CREATE TABLE "films" (
    "id" SERIAL NOT NULL,
    "producer" TEXT,
    "title" TEXT,
    "episode_id" INTEGER,
    "director" TEXT,
    "release_date" TEXT,
    "opening_crawl" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_people" (
    "film_id" INTEGER NOT NULL,
    "people_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_people_pkey" PRIMARY KEY ("film_id","people_id")
);

-- CreateTable
CREATE TABLE "film_species" (
    "film_id" INTEGER NOT NULL,
    "species_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_species_pkey" PRIMARY KEY ("film_id","species_id")
);

-- CreateTable
CREATE TABLE "film_starships" (
    "film_id" INTEGER NOT NULL,
    "starship_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_starships_pkey" PRIMARY KEY ("film_id","starship_id")
);

-- CreateTable
CREATE TABLE "film_vehicles" (
    "film_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_vehicles_pkey" PRIMARY KEY ("film_id","vehicle_id")
);

-- CreateTable
CREATE TABLE "film_planets" (
    "film_id" INTEGER NOT NULL,
    "planet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_planets_pkey" PRIMARY KEY ("film_id","planet_id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "starships" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "starships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "film_people" ADD CONSTRAINT "film_people_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_people" ADD CONSTRAINT "film_people_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_species" ADD CONSTRAINT "film_species_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_species" ADD CONSTRAINT "film_species_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_starships" ADD CONSTRAINT "film_starships_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_starships" ADD CONSTRAINT "film_starships_starship_id_fkey" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_vehicles" ADD CONSTRAINT "film_vehicles_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_vehicles" ADD CONSTRAINT "film_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_planets" ADD CONSTRAINT "film_planets_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film_planets" ADD CONSTRAINT "film_planets_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
