import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/users/entities/user.entity';

declare module 'express-serve-static-core' {
    interface Request {
        decoded?: UserEntity;
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            const payload = this.jwtService.verify(token);
            request['decoded'] = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}