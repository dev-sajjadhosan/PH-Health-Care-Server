import dotenv from "dotenv";
import AppError from "../errorHelpers/AppError";
import status from "http-status";
dotenv.config();

interface EnvConfig {
  PORT: string;
  SERVER_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  DATABASE_URL: string;
  NODE_ENV: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariable = [
    "PORT",
    "SERVER_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "DATABASE_URL",
    "NODE_ENV",
  ];

  requiredEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${variable} is required but not set in .env file`,
      );
    }
  });

  return {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    SERVER_URL: process.env.SERVER_URL as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
  };
};

export const envVars = loadEnvVariables();
