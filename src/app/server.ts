config();

import { config } from "dotenv";
import app from "./app";
import { envVars } from "../config/env";

const runLolo = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log("The Server is running now.");
      console.log(`Server Port is::]=> ${envVars.PORT}`);
      console.log(`The Server Live Link ${envVars.PORT}`);
    });
  } catch (err) {
    console.error("Failed tp start server", err);
  }
};

runLolo();
