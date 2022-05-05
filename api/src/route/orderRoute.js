import Router from "express";
import OrderController from "../controller/orderController.js";

const route = Router();
const client = new OrderController();

route.post("/new", client.CreateOrder.bind(client));
route.get("/orders", client.GetOrders.bind(client));

export default route;
