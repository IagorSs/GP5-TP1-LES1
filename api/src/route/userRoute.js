import Router from "express";
import UserController from "../controller/userController.js";

const route = Router();
const client = new UserController();

route.post("/new", client.Create.bind(client));

export default route;
