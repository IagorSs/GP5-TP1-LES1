import { Router } from "express";
import Home from "./home";

const Routes = Router();

Routes.get("/", Home);

export default Routes;
