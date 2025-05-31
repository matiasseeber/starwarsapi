import { Injectable } from "@nestjs/common";
import { CreateGenericDto } from "src/shared/models/dtos/create-generic";
import { GenericFilterDto } from "src/shared/models/dtos/filter-generic";
import { GenericEntity } from "src/shared/models/entities/generic.entity";
import { PrismaService } from "src/shared/prisma/prisma.service";


@Injectable()
export class PeopleRepository {
    private prisma: PrismaService;

    constructor(prisma: PrismaService = new PrismaService()) {
        this.prisma = prisma;
    }

    public create = async (data: CreateGenericDto) => {
        const result = await this.prisma.people.create({
            data
        });

        return new GenericEntity(result);
    }

    public createMany = async (data: CreateGenericDto[]) => 
        Promise.all(data.map(async item => await this.create(item)));

    public findAll = async (filter: GenericFilterDto) => {
        const result = await this.prisma.people.findMany({
            where: filter
        });

        return result.map(item => new GenericEntity(item));
    }

    public findOne = async (filter: GenericFilterDto) => {
        const result = await this.prisma.people.findFirst({
            where: filter
        });

        return result && new GenericEntity(result);
    }
}