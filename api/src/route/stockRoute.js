import Router from "express";
import StockController from "../controller/stockController.js";

const route = Router();
const client = new StockController();

route.post("/drink/new", client.CreateDrink.bind(client));
route.post("/pizza/flavor/new", client.CreatePizzaFlavor.bind(client));

export default route;