import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EmailService } from 'src/shared/emails/email-sender.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login-endpoint.dto';
import { UsersService } from 'src/users/users.service';

// Mocks
const mockUsersService = {
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
  updateUserSensitiveInfo: jest.fn(),
  findUserById: jest.fn(),
};

const mockEmailService = {
  sendEmail: jest.fn(),
};

const mockAuthRepository = {
  findLoginRecord: jest.fn(),
  createLoginRecord: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mocked-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: AuthRepository, useValue: mockAuthRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and send verification code', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: '1234',
      };

      const mockUser = {
        id: 1,
        email: dto.email,
        deleteSensitiveInfo: jest.fn(),
      };

      mockUsersService.createUser.mockResolvedValue(mockUser);
      mockUsersService.findUserByEmail.mockResolvedValue(mockUser);
      mockUsersService.updateUserSensitiveInfo.mockResolvedValue(mockUser);
      mockEmailService.sendEmail.mockResolvedValue(null);

      const spy = jest.spyOn(service, "sendVerificationCode")

      const result = await service.register({ ...dto });

      expect(mockUsersService.createUser).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(mockUser.deleteSensitiveInfo).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('sendVerificationCode', () => {
    it('should throw if user not found', async () => {
      mockUsersService.findUserByEmail.mockResolvedValue(null);

      await expect(service.sendVerificationCode('notfound@example.com'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('login', () => {
    it('should throw if only email or password is provided', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
      };

      await expect(service.login(dto)).rejects.toThrow(BadRequestException);
    });

    it('should login with email/password', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        username: 'user',
        password: '$2b$10$somethinghashed',
        created_at: new Date(),
        is_admin: false,
        verificated_at: new Date(),
        deleteSensitiveInfo: jest.fn(),
      };

      const dto: LoginDto = {
        email: 'test@example.com',
        password: '1234',
      };

      mockUsersService.findUserByEmail.mockResolvedValue(user);
      jest.spyOn(require('bcrypt'), 'compareSync').mockReturnValue(true);
      mockAuthRepository.createLoginRecord.mockResolvedValue(null);

      const result = await service.login(dto);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.user.email).toBe(user.email);
    });
  });

  describe('verifyEmail', () => {
    it('should throw if user not found', async () => {
      mockUsersService.findUserByEmail.mockResolvedValue(null);
      await expect(service.verifyEmail({ email: 'x@x.com', verification_code: '1234' }))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw if verification code is invalid', async () => {
      const user = {
        id: 1,
        email: 'x@x.com',
        verification_code: '1234',
      };
      mockUsersService.findUserByEmail.mockResolvedValue(user);
      await expect(service.verifyEmail({ email: 'x@x.com', verification_code: '0000' }))
        .rejects
        .toThrow(UnauthorizedException);
    });

    it('should verify user', async () => {
      const user = {
        id: 1,
        email: 'x@x.com',
        verification_code: '1234',
        deleteSensitiveInfo: jest.fn(),
      };
      mockUsersService.findUserByEmail.mockResolvedValue(user);
      mockUsersService.updateUserSensitiveInfo.mockResolvedValue(user);

      const result = await service.verifyEmail({ email: 'x@x.com', verification_code: '1234' });
      expect(result).toEqual(user);
    });
  });
});
