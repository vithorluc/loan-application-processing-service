import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/src/infrastructure/database/migrations/*{.ts,.js}"],
    seeds: ["dist/src/infrastructure/database/seeds/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);