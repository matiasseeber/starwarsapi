import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateFilmDto } from "./dtos/create-film.dto";
import { FilmEntity } from "./entities/film.entity";
import { FilmFilterDto } from "./dtos/film-filter.dto";
import { UpdateFilmDto } from "./dtos/update-film.dto";


// separate files for each table

@Injectable()
export class FilmsRepository {
    private prisma: PrismaService;

    constructor(prisma: PrismaService = new PrismaService()) {
        this.prisma = prisma;
    }

    public create = async (data: CreateFilmDto) => {
        if (!data.id) {
            const record = await this.prisma.films.findFirst({ orderBy: { id: 'desc' } })
            if (!record)
                data.id = 1;
            else
                data.id = record.id + 1;
        }

        const result = await this.prisma.films.create({
            data: {
                ...data,
                //should separate insert and update of each table in different modules
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

    public update = async (id: number, data: UpdateFilmDto) => {
        const result = await this.prisma.films.update({
            where: { id },
            data,
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
        })
        return new FilmEntity(result);
    }
}