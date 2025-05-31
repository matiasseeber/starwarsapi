import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios"
import * as rxjs from "rxjs";
import { ResponseFlatTableEntity, Result, FilmsResult } from './entities/response.entity';

@Injectable()
export class StarWarsService {
    private readonly base_url = "https://www.swapi.tech/api";

    constructor(private readonly httpService: HttpService) { }

    public getTableData = async <T>(endpoint: "people" | "planets" | "vehicles" | "starships" | "species" | "films"): Promise<T[]> => {
        const data = await rxjs.firstValueFrom(
            this.httpService.get<ResponseFlatTableEntity>(`${this.base_url}/${endpoint}?page=0&limit=100000`).pipe(
                rxjs.map(response => response.data)
            )
        );

        return (data.results ? data.results : data.result)as T[];
    }

    public getPeople = async (): Promise<Result[]> =>
        this.getTableData<Result>("people");

    public getPlanets = async (): Promise<Result[]> =>
        this.getTableData<Result>("planets");

    public getVehicles = async (): Promise<Result[]> =>
        this.getTableData<Result>("vehicles");

    public getStarships = async (): Promise<Result[]> =>
        this.getTableData<Result>("starships");

    public getSpecies = async (): Promise<Result[]> =>
        this.getTableData<Result>("species");

    public getFilms = async (): Promise<FilmsResult[]> =>
        this.getTableData<FilmsResult>("films");
}