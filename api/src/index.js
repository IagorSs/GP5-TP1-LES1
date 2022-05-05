import express from "express";
import dotenv from "dotenv";
import route from "./route/route.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  app.use(cors());
  next();
});

app.use(route);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
