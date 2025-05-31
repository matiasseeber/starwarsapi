import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UserFilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    username?: string;

    @ApiPropertyOptional()
    @IsOptional()
    email?: string;
}