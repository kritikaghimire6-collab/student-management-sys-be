import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,

  // Database
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "5432",
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "12345",
  DB_NAME: process.env.DB_NAME || "user_app_db",
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE || "true",

  BASE_URL: process.env.BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "sdbaskdasnc cdkaoxsxaskdnajbsd",

  MAIL_USERNAME: process.env.MAIL_USERNAME || "kritikaghimire2021@gmail.com",
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || "htbp vnil zshb vhtx",
};
