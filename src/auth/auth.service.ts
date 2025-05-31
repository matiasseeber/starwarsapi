import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { EmailService } from 'src/shared/emails/email-sender.service';
import { LoginDto } from './dto/login-endpoint.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly emailService: EmailService,
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ) { }

    public register = async (data: CreateUserDto) => {
        data.password = hashSync(data.password, 10);

        const user = await this.usersService.createUser(data);
        // do not wait for the email to be sent
        this.sendVerificationCode(data.email);

        user.deleteSensitiveInfo();

        return user;
    }

    public sendVerificationCode = async (email: string) => {
        const verification_code = Math.random().toString().substring(3, 9);
        const verification_code_sent_at = new Date();

        const user = await this.usersService.findUserByEmail(email);

        if (!user)
            throw new NotFoundException('User not found');

        const updated_user = await this.usersService.updateUserSensitiveInfo(user.id, { verification_code, verification_code_sent_at });

        await this.emailService.sendEmail(email, 'Verification code', "register", { verification_code });

        updated_user.deleteSensitiveInfo();

        return updated_user;
    }

    public login = async (data: LoginDto) => {
        let user: UserEntity | null = null;

        if (((data.email && !data.password) || (!data.email && data.password)) && !data.refresh_token)
            throw new BadRequestException('Both email and password are required');

        if (data.email && data.password) {
            user = await this.usersService.findUserByEmail(data.email);

            if (!user)
                throw new NotFoundException('User not found');

            if (!user.password)
                throw new UnauthorizedException('User has no password');

            if (!compareSync(data.password, user.password))
                throw new UnauthorizedException('Invalid user-password combination');
        } else {
            const loginRecord = await this.authRepository.findLoginRecord({ refresh_token: data.refresh_token });

            if (!loginRecord)
                throw new UnauthorizedException('Invalid refresh token');

            if(loginRecord.created_at.getTime() + (1000 * 60 * 60 * 24 * 7) < new Date().getTime())
                throw new UnauthorizedException('Refresh token expired');

            user = await this.usersService.findUserById(loginRecord.user_id);

            if (!user)
                throw new NotFoundException('User not found');
        }

        if (!user.verificated_at)
            throw new UnauthorizedException('User not verified');

        user.deleteSensitiveInfo();

        const token_payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            is_admin: user.is_admin,
        };

        const token = this.jwtService.sign(token_payload);

        const refresh_token = Math.random().toString().substring(3, 9);

        await this.authRepository.createLoginRecord({ user_id: user.id, refresh_token });

        return {
            user,
            token,
            refresh_token
        };
    }

    public verifyEmail = async (data: VerifyEmailDto) => {
        const user = await this.usersService.findUserByEmail(data.email);

        if (!user)
            throw new NotFoundException('User not found');

        if (!user.verification_code)
            throw new UnauthorizedException('User has no verification code');

        if (user.verification_code !== data.verification_code)
            throw new UnauthorizedException('Invalid verification code');

        const updated_user = await this.usersService.updateUserSensitiveInfo(user.id, { verificated_at: new Date() });

        updated_user.deleteSensitiveInfo();

        return updated_user;
    }
}