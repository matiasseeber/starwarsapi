import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class LoginFilterDto {
    @ApiProperty()
    @IsInt()
    user_id?: number;

    @ApiProperty()
    @IsString()
    refresh_token?: string;
}