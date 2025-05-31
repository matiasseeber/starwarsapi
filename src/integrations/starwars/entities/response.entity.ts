import { ApiProperty } from "@nestjs/swagger";

export class ResponseFlatTableEntity implements Omit<RootObject, "results" | "next" | "previous"> {
    constructor(data: Partial<ResponseFlatTableEntity>) {
        Object.assign(this, data);
    }

    @ApiProperty()
    message: string;

    @ApiProperty()
    total_records: number;

    @ApiProperty()
    total_pages: number;

    @ApiProperty()
    result?: Result[];

    @ApiProperty()
    results?: FilmsResult[];

    @ApiProperty()
    apiVersion: string;

    @ApiProperty()
    timestamp: string;

    @ApiProperty()
    support: Support;

    @ApiProperty()
    social: Social;
}

interface RootObject {
    message: string;
    total_records: number;
    total_pages: number;
    previous: null;
    next: null;
    apiVersion: string;
    timestamp: string;
    support: Support;
    social: Social;
}

interface Social {
    discord: string;
    reddit: string;
    github: string;
}

interface Support {
    contact: string;
    donate: string;
    partnerDiscounts: PartnerDiscounts;
}

interface PartnerDiscounts {
    saberMasters: SaberMasters;
    heartMath: SaberMasters;
}

interface SaberMasters {
    link: string;
    details: string;
}

export interface Result {
    uid: string;
    name: string;
    url: string;
}

export interface FilmsResult {
    properties: Properties;
    _id: string;
    description: string;
    uid: string;
    __v: number;
}

interface Properties {
    created: string;
    edited: string;
    starships: string[];
    vehicles: string[];
    planets: string[];
    producer: string;
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
    opening_crawl: string;
    characters: string[];
    species: string[];
    url: string;
}