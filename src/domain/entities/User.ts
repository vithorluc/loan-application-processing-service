import { Role } from "src/infrastructure/database/entities/Role";

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}