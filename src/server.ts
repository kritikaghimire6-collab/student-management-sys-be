import dotenv from "dotenv";
import env from "./config/env";
import {AppDataSource} from "./config/db";
import app from "./config/express";

dotenv.config();

const PORT = env.PORT;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server has been connected on port ${PORT}`);
    });
  } catch (error) {
    console.error("Cannot Connect to DB", error);
    process.exit(1);
  }
}

startServer();
