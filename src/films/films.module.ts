// users.module.ts
import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsRepository } from './films.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FilmsController } from './films.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [FilmsService, FilmsRepository],
    exports: [FilmsService, FilmsRepository],
    controllers: [FilmsController],
    imports: [PrismaModule, AuthModule]
})
export class FilmsModule { }
