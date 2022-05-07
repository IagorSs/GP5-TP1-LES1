import Router from "express";
import OrderController from "../controller/orderController.js";

const route = Router();
const client = new OrderController();

route.post("/new", client.CreateOrder.bind(client));
route.get("/find", client.GetOrder.bind(client));
route.get("/status", client.GetQueuebyStatus.bind(client));
route.post("/status/update", client.UpdateStatusOrder.bind(client));
route.post("/cancel", client.CancelOrder.bind(client));

export default route;
