import express from "express";
import dotenv from "dotenv";
import route from "./route/route.js";
import cors from "cors";
import Auth from "./utils/auth.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(Auth);

app.use(route);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
