import { ApiProperty } from "@nestjs/swagger";
import { logins } from "@prisma/client";

export class LoginEntity implements logins {
    constructor(data: Partial<LoginEntity>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    refresh_token: string;

    @ApiProperty()
    created_at: Date;
}