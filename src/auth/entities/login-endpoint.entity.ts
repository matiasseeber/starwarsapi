import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

export class LoginEndpointEntity {
    constructor(data: Partial<LoginEndpointEntity>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    user: UserEntity;

    @ApiProperty()
    token: string;
}