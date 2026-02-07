import express, { Application, Request, Response } from "express";
import cors from "cors";
import { indexRoutes } from "./routes";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

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

export default app;
