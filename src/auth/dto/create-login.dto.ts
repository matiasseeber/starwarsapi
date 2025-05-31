import { ApiProperty } from "@nestjs/swagger";

export class CreateLoginDto {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    refresh_token: string;
}