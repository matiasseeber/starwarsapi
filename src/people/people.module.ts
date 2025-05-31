// users.module.ts
import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleRepository } from './people.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { SpeciesController } from './people.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [PeopleService, PeopleRepository, JwtService],
    exports: [PeopleService, PeopleRepository],
    controllers: [SpeciesController],
    imports: [PrismaModule, AuthModule]
})
export class PeopleModule { }
