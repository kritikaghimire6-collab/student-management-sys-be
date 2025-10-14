import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import indexRoute from "../route/index.route";
import cookieParser from "cookie-parser";
import corsOptions from "../utils/cors";
import { errorConverter } from "../utils/error";
const app = express();

// cors setting
app.use(corsOptions);
app.use(cookieParser());

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const throttleRequests = (req: Request, res: Response, next: NextFunction) => {
//   setTimeout(() => {
//     next();
//   }, 500);
// };

// app.use(throttleRequests);

// app.use("/api/v1", indexRoute);
// app.use(
//   rateLimit({
//     limit: 60,
//     message: "Too many requests, please try again later.",
//   })
// );
app.use("/", indexRoute);
// app.use("/form", uploadRoute);

app.use("*", (req: Request, res: Response) => {
  res.status(404).render("not-found");
});
app.use(errorConverter);

// HANDLER UNCAUGHT EXCEPTION
process.on("unhandledRejection", (reason, promise) => {
  console.error(reason, "\n unhandledRejection \n", promise);
  console.error({ reason, promise });
});

process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  console.error(err);
  process.exit(1);
});

export default app;
