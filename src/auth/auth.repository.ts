import { PrismaService } from "src/shared/prisma/prisma.service";
import { LoginFilterDto } from "./dto/login-filter.dto";
import { Injectable } from "@nestjs/common";
import { LoginEntity } from "./entities/login.entity";
import { CreateLoginDto } from "./dto/create-login.dto";

@Injectable()
export class AuthRepository {
    private prisma: PrismaService;

    constructor(prisma: PrismaService = new PrismaService()) {
        this.prisma = prisma;
    }

    public findLoginRecord = async (filter: LoginFilterDto) => {
        const loginRecord = await this.prisma.logins.findFirst({
            where: filter
        });

        return loginRecord && new LoginEntity(loginRecord);
    }

    public createLoginRecord = async (data: CreateLoginDto) => {
        const loginRecord = await this.prisma.logins.create({
            data
        });

        return new LoginEntity(loginRecord);
    }
}