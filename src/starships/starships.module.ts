// users.module.ts
import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsRepository } from './starships.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { StarshipsController } from './starships.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [StarshipsService, StarshipsRepository, JwtService],
    exports: [StarshipsService, StarshipsRepository],
    controllers: [StarshipsController],
    imports: [PrismaModule, AuthModule]
})
export class StarshipsModule { }
