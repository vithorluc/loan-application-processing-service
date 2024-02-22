export class DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  
    constructor() {
      this.host = process.env.DB_HOST || 'localhost';
      this.port = parseInt(process.env.DB_PORT, 10) || 5432;
      this.username = process.env.DB_USERNAME || 'poll_user';
      this.password = process.env.DB_PASSWORD || 'poll_password';
      this.database = process.env.DB_DATABASE || 'poll_db';
    }
  }