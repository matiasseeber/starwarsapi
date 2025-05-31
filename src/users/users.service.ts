import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto, UpdateUserSensitiveInfoDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UsersRepository,
    ) { }

    public createUser = async(data: CreateUserDto) =>
        this.userRepository.create(data);

    async findUserById(id: number) {
        return this.userRepository.findOne({ id });
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ email });
    }

    async updateUser(id: number, data: UpdateUserDto) {
        return this.userRepository.update(id, data);
    }

    async updateUserSensitiveInfo(id: number, data: UpdateUserSensitiveInfoDto) {
        return this.userRepository.update(id, data);
    }
}