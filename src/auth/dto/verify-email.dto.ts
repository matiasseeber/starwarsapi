import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyEmailDto {
    @ApiProperty()
    @IsNotEmpty()
    verification_code: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;
}