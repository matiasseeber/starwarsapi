import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsDate, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserSensitiveInfoDto extends PartialType(UpdateUserDto) {
    @IsString()
    verification_code?: string;

    @IsDate()
    verification_code_sent_at?: Date;

    @IsString()
    password?: string;

    @IsDate()
    verificated_at?: Date;
}