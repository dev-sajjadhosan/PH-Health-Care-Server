config();

import { config } from "dotenv";
import app from "./app";
const port = process.env.PORT;

const runLolo = () => {
  try {
    app.listen(port, () => {
      console.log("The Server is running now.");
      console.log(`Server Port is::]=> ${port}`);
      console.log(`The Server Live Link ${process.env.SERVER_URL}`);
    });
  } catch (err) {
    console.error("Failed tp start server", err);
  }
};

runLolo();
