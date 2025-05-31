import { ApiProperty } from "@nestjs/swagger";

interface Generic {
    id: number;
    name: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

export class GenericEntity implements Generic {
    constructor(data: Partial<Generic>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}