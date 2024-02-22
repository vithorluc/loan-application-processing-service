import { User } from "./User";


export interface Application {
  id: number;
  applicant: User;
  status: string;
  submissionDate: Date;
}