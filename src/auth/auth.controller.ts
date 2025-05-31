import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-endpoint.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginEndpointEntity } from './entities/login-endpoint.entity';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiCreatedResponse({ type: UserEntity }) 
    async register(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginEndpointEntity }) 
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

    @Post('verify')
    @ApiCreatedResponse({ type: UserEntity }) 
    async verifyEmail(@Body() data: VerifyEmailDto) {
        return this.authService.verifyEmail(data);
    }

    @Post('send_verification_code')
    @ApiCreatedResponse({ type: UserEntity }) 
    async re_send_verification_code(@Param('email') email: string) {
        return this.authService.sendVerificationCode(email);
    }
}
