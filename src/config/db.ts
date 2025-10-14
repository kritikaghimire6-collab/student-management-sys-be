import {join} from "node:path";
import {DataSource} from "typeorm";
import env from "./env";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SYNCHRONIZE,
  NODE_ENV,
} = env;



export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT!),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [join(__dirname, "../entities/**/*.entities{.ts,.js}")],
  // migrations: [join(__dirname, "../database/migrations/**/*.ts")],
  // migrationsRun: true,
  synchronize: true,
  logging: NODE_ENV === "local",

  //@ts-ignore
  cli: {
    entitiesDir: "src/apps/**/*.entity{.ts,.js}",
    migrationsDir: "src/migration",
  },
});
