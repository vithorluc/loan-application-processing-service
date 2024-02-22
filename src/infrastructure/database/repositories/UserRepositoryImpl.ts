import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../application/interfaces/UserRepository';
import { Role } from '../entities/Role';


interface UserCreationPayload {
  username: string;
  email: string;
  password: string;
  role: Role
}


@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(payload: UserCreationPayload): Promise<User> {
    const newUser: DeepPartial<User> = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };

    return this.userRepository.save(newUser);
  }
}
