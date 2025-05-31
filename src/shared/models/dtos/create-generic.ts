import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGenericDto {
    constructor(data: Partial<CreateGenericDto>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;
}