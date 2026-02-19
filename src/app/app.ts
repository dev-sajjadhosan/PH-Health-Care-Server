import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { indexRoutes } from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import path from "path";
import { envVars } from "./config/env";
import qs from "qs";
import { PaymentController } from "./modules/payment/payment.controller";
import corn from "node-cron";
import { AppointmentController } from "./modules/appointment/appointment.controller";
import { AppointmentService } from "./modules/appointment/appointment.service";

const app: Application = express();
const port = process.env.PORT;

app.set("query parser", (str: string) => qs.parse(str));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));

app.post(
  "/webhook",
  express.raw({
    type: "application/json",
  }),
  PaymentController.handleStripeWebhookEvent,
);

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());
// Enable URL-encoded from data parsing
app.use(express.urlencoded({ extended: true }));

corn.schedule("*/25 * * * *", async () => {
  try {
    console.log("Running corn job to cancel unpaid appointments...");
    await AppointmentService.cancelUnpaidAppointments();
  } catch (error: any) {
    console.error(
      "Error Occurred while canceling unpaid appointments:",
      error.message,
    );
  }
});

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
app.use(notFound);
export default app;
