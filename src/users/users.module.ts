// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersModule],
    imports: [PrismaModule]
})
export class UsersModule { }
