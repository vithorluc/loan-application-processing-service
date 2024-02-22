import { Role } from 'src/domain/entities/Role';
import { User } from '../../domain/entities/User';

interface UserCreationPayload {
  username: string;
  email: string;
  password: string;
  role: any
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  createUser(payload: UserCreationPayload): Promise<User>;
  findById(id: string): Promise<User | undefined>;
}