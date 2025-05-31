import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthRepository } from './auth.repository';
import { EmailModule } from 'src/shared/emails/email-sender.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "mysuperjwtsecret",
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    PrismaModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthRepository],
  exports: [AuthGuard, JwtModule]
})
export class AuthModule { }
