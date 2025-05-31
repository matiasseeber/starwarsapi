// users.module.ts
import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsRepository } from './planets.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { PlanetsController } from './planets.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [PlanetsService, PlanetsRepository, JwtService],
    exports: [PlanetsService, PlanetsRepository],
    controllers: [PlanetsController],
    imports: [PrismaModule, AuthModule]
})
export class PlanetsModule { }
