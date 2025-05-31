// users.module.ts
import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesRepository } from './vehicles.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { VehiclesController } from './vehciles.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [VehiclesService, VehiclesRepository, JwtService],
    exports: [VehiclesService, VehiclesRepository],
    controllers: [VehiclesController],
    imports: [PrismaModule, AuthModule]
})
export class VehiclesModule { }
