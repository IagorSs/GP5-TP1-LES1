import { Router } from "express";
import User from "./userRoute.js";
import Stock from "./stockRoute.js";
import Order from "./orderRoute.js";

const Routes = Router();

Routes.use("/user", User);
Routes.use("/stock", Stock);
Routes.use("/order", Order);

export default Routes;
