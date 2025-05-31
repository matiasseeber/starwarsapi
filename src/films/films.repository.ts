import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateFilmDto } from "./dtos/create-film.dto";
import { FilmEntity } from "./entities/film.entity";
import { FilmFilterDto } from "./dtos/film-filter.dto";


// separate files for each table

@Injectable()
export class FilmsRepository {
    private prisma: PrismaService;

    constructor(prisma: PrismaService = new PrismaService()) {
        this.prisma = prisma;
    }

    public create = async (data: CreateFilmDto) => {
        const result = await this.prisma.films.create({
            data: {
                ...data,
                film_people: {
                    createMany: {
                        data: data.film_people.map(id => ({ people_id: id }))
                    }
                },
                film_species: {
                    createMany: {
                        data: data.film_species.map(id => ({ species_id: id }))
                    }
                },
                film_starships: {
                    createMany: {
                        data: data.film_starships.map(id => ({ starship_id: id }))
                    }
                },
                film_vehicles: {
                    createMany: {
                        data: data.film_vehicles.map(id => ({ vehicle_id: id }))
                    }
                },
                film_planets: {
                    createMany: {
                        data: data.film_planets.map(id => ({ planet_id: id }))
                    }
                }
            },
            include: {
                film_people: {
                    include: {
                        people: true
                    }
                },
                film_species: {
                    include: {
                        species: true
                    }
                },
                film_starships: {
                    include: {
                        starships: true
                    }
                },
                film_vehicles: {
                    include: {
                        vehicles: true
                    }
                },
                film_planets: {
                    include: {
                        planets: true
                    }
                }
            }
        });

        return new FilmEntity(result);
    }

    public createMany = async (data: CreateFilmDto[]) => 
        Promise.all(data.map(async item => await this.create(item)));

    public findAll = async (filter: FilmFilterDto) => {
        const result = await this.prisma.films.findMany({
            where: filter,
        });

        return result.map(item => new FilmEntity(item));
    }

    public findOne = async (filter: FilmFilterDto) => {
        const result = await this.prisma.films.findFirst({
            where: filter,
            include: {
                film_people: {
                    include: {
                        people: true
                    }
                },
                film_species: {
                    include: {
                        species: true
                    }
                },
                film_starships: {
                    include: {
                        starships: true
                    }
                },
                film_vehicles: {
                    include: {
                        vehicles: true
                    }
                },
                film_planets: {
                    include: {
                        planets: true
                    }
                }
            }
        });

        return result && new FilmEntity(result);
    }
}