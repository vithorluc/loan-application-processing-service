import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

export enum RoleTypes {
  Admin = 'Admin',
  Applicant = 'Applicant',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    default: RoleTypes.Applicant
  })
  name: RoleTypes;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
