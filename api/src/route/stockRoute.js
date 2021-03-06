import Router from "express";
import StockController from "../controller/StockController.js";

const route = Router();
const client = new StockController();

route.post("/drink/new", client.CreateDrink.bind(client));
route.get("/drink", client.GetDrinks.bind(client));
route.get("/drink/search", client.SearchDrink.bind(client));

route.post("/pizza/new", client.CreatePizza.bind(client));
route.get("/pizza", client.GetPizzas.bind(client));
route.get("/pizza/search", client.SearchPizza.bind(client));

route.post("/pizza/flavor/new", client.CreatePizzaFlavor.bind(client));
route.get("/pizza/flavor", client.GetFlavors.bind(client));

route.post("/combo/new", client.CreateCombo.bind(client));
route.get("/combo", client.GetCombo.bind(client));
route.get("/combo/search", client.SearchCombo.bind(client));

export default route;
