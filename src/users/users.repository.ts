import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserFilterDto } from "./dtos/user-filter.dto";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserDto, UpdateUserSensitiveInfoDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersRepository {
    private prisma: PrismaService;

    constructor(prisma: PrismaService = new PrismaService()) {
        this.prisma = prisma;
    }

    public create = async (data: CreateUserDto) => {
        const user = await this.prisma.users.create({
            data
        });

        return new UserEntity(user);
    }

    public findAll = async (filter: UserFilterDto) => {
        const users = await this.prisma.users.findMany({
            where: filter
        });

        return users.map(user => new UserEntity(user));
    }

    public findOne = async (filter: UserFilterDto) => {
        const result = await this.prisma.users.findFirst({
            where: filter
        });

        return result && new UserEntity(result);
    }

    public update = async (id: number, data: UpdateUserDto | UpdateUserSensitiveInfoDto) => {
        const user = await this.prisma.users.update({
            where: {
                id
            },
            data
        });

        return new UserEntity(user);
    }
}