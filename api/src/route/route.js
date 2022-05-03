import { Router } from "express";
import User from "./userRoute.js";

const Routes = Router();

Routes.use("/user", User);

export default Routes;
