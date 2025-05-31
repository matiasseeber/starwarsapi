import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateFilmDto {
    @ApiProperty()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    producer?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    episode_id?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    director?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    release_date?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    opening_crawl?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    film_people: number[] = [];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    film_species: number[] = [];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    film_starships: number[] = [];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    film_vehicles: number[] = [];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    film_planets: number[] = [];
}