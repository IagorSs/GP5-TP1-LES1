import { Router } from "express";
import User from "./userRoute.js";
import Stock from "./stockRoute.js";

const Routes = Router();

Routes.use("/user", User);
Routes.use("/stock", Stock);

export default Routes;
