import { ApiProperty } from "@nestjs/swagger";
import { films } from "@prisma/client";
import { GenericEntity } from "src/shared/models/entities/generic.entity";

// create separate files for each class

export interface GenericFilmTable {
    film_id: number;
    created_at: Date;
    updated_at: Date;
}

export class FilmPeopleEntity implements GenericFilmTable {
    constructor(data: Partial<GenericFilmTable>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    film_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    people_id: number;

    @ApiProperty()
    people: GenericEntity;
}

export class FilmSpeciesEntity implements GenericFilmTable {
    constructor(data: Partial<GenericFilmTable>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    film_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    species_id: number;

    @ApiProperty()
    species: GenericEntity;
}

export class FilmStarshipsEntity implements GenericFilmTable {
    constructor(data: Partial<GenericFilmTable>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    film_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    starship_id: number;

    @ApiProperty()
    starships: GenericEntity;
}

export class FilmVehiclesEntity implements GenericFilmTable {
    constructor(data: Partial<GenericFilmTable>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    film_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    vehicle_id: number;

    @ApiProperty()
    vehicles: GenericEntity;
}

export class FilmPlanetsEntity implements GenericFilmTable {
    constructor(data: Partial<GenericFilmTable>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    film_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    planet_id: number;

    @ApiProperty()
    planets: GenericEntity;
}

export class FilmEntity implements films {
    constructor(data: Partial<films>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    producer: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    episode_id: number;

    @ApiProperty()
    director: string;

    @ApiProperty()
    release_date: string;

    @ApiProperty()
    opening_crawl: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    film_people?: FilmPeopleEntity[];

    @ApiProperty()
    film_species?: FilmSpeciesEntity[];

    @ApiProperty()
    film_starships?: FilmStarshipsEntity[];

    @ApiProperty()
    film_vehicles?: FilmVehiclesEntity[];

    @ApiProperty()
    film_planets?: FilmPlanetsEntity[];
}