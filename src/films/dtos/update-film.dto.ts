import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateFilmDto {
    @ApiPropertyOptional()
    @IsOptional()
    id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    producer?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    episode_id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    director?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    release_date?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    opening_crawl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}