export class Role {
    id: string;
    name: RoleType;
}

export enum RoleType {
    Admin = 'Admin',
    Applicant = 'Applicant',
  }