// users.module.ts
import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesRepository } from './species.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { SpeciesController } from './species.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [SpeciesService, SpeciesRepository, JwtService],
    exports: [SpeciesService, SpeciesRepository],
    controllers: [SpeciesController],
    imports: [PrismaModule, AuthModule]
})
export class SpeciesModule { }
