import { ApiProperty } from "@nestjs/swagger";
import { users } from "@prisma/client";

export class UserEntity implements users {
    constructor(data: Partial<users>) {
        Object.assign(this, data);
    }

    public deleteSensitiveInfo = () => {
        this.password = null;
        this.verification_code = null;
        this.verification_code_sent_at = null;
        this.verificated_at = null;
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    password: string | null;

    verification_code: string | null;

    verificated_at: Date | null;

    verification_code_sent_at: Date | null;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    is_admin: boolean;
}