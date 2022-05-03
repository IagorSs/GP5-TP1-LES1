import express from "express";
import dotenv from "dotenv";
import route from "./route/route.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
