import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { CreateFilmDto } from './dtos/create-film.dto';
import { FilmFilterDto } from './dtos/film-filter.dto';

@Injectable()
export class FilmsService {
    constructor(
        private repository: FilmsRepository,
    ) { }

    public createMany = async (data: CreateFilmDto[]) =>
        this.repository.createMany(data);

    public create = async (data: CreateFilmDto) =>
        this.repository.create(data);

    public findAll = async (filter: FilmFilterDto) =>
        this.repository.findAll(filter);

    public findOne = async (filter: FilmFilterDto) =>
        this.repository.findOne(filter);
}