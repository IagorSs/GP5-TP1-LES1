import Router from "express";
import UserController from "../controller/userController.js";

const route = Router();
const client = new UserController();

route.post("/new", client.Create.bind(client));
route.post("/login", client.Login.bind(client));
route.post("/order/new", client.CreateOrder.bind(client));
route.get("/history", client.GetHistory.bind(client));
route.get("/token", client.TokenAuth.bind(client));
route.get("/address", client.GetAddress.bind(client));

export default route;
