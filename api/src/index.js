import express from "express";
import dotenv from "dotenv";
import Routes from "./route/route";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(Routes);

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
