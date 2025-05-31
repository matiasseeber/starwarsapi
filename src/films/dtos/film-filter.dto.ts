import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional } from "class-validator";

export class FilmFilterDto {
    id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    producer?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    title?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    episode_id?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    director?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    release_date?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    opening_crawl?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    description?: string;
}