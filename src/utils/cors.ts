import cors from "cors";
import env from "../config/env";

const isDevelopment = env.NODE_ENV === "development";

const corsOptions = cors({
  origin: isDevelopment
    ? (origin, callback) => callback(null, true) // allow all origins in dev
    : [env.BASE_URL ?? ""],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
});

export default corsOptions;
