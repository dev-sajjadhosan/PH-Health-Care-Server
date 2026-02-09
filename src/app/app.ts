import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { indexRoutes } from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cookieParser from 'cookie-parser'

const app: Application = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1", indexRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    name: "Ph Health Care Server",
    port,
    localUrl: `http://localhost:${port}`,
    liveUrl: null,
    deploy_server: null,
    message:
      "Server is running now. This server is making for to improve our life to reach out to the best doctor and try to help the patient who are looking for the best doctor.",
    version: "v1",
    module: "Module 37 | Part 01",
  });
});

app.use(globalErrorHandler);
app.use(notFound)
export default app;
