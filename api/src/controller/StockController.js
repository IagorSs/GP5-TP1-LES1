import Controller from "./database/controller.js";
import {
  BuildPizza,
  BuildDrinks,
  BuildComboItens,
  BuidOrder,
} from "./StockUtils.js";

const Pizza = new Controller("Pizza");
const PizzaFlavor = new Controller("PizzaFlavor");
const Drink = new Controller("Drink");
const Combo = new Controller("Combo");

class StockController {
  async CreatePizzaFlavor(request, response) {
    const { Name, Description } = request.body;

    const params = {
      data: {
        Name,
        Description,
      },
    };

    const flavor = await PizzaFlavor.Create(params);

    if (flavor.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Flavor",
        })
        .status(500);

    return response.send({ message: "Pizza flavor created!" }).status(200);
  }

  async CreateDrink(request, response) {
    const { Name, Description, Size, Price, Quantity, Url } = request.body;

    const params = {
      data: {
        Name,
        Description,
        Size,
        Url,
        Price: parseFloat(Price),
      },
    };
    const drink = await Drink.Create(params);

    if (drink.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Drink",
        })
        .status(500);

    return response.send({ message: "Drink created!" }).status(200);
  }

  async CreatePizza(request, response) {
    const { Flavors, Name, Size, Price, Url } = request.body;

    const [flavor0, flavor1] = Flavors.split(",");
    const list = [flavor0];
    if (flavor1) list.push(flavor1);

    const params = {
      data: {
        Flavor: list,
        Name,
        Url,
        Size,
        Price: parseFloat(Price),
      },
    };

    const pizza = await Pizza.Create(params);
    if (pizza.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Pizza",
        })
        .status(500);

    return response.send({ message: "Pizza created!" }).status(200);
  }

  async CreateCombo(request, response) {
    const { Name, Description, Pizzas, Drinks, Price } = request.body;

    const params = {
      data: {
        Name,
        Description,
        Pizzas: Pizzas.split(","),
        Drinks: Drinks.split(","),
        Price: parseFloat(Price),
      },
    };

    const combo = await Combo.Create(params);

    if (combo.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Combo",
        })
        .status(500);

    return response.send({ message: "Combo created!" }).status(200);
  }

  async GetCombo(request, response) {
    const { comboId } = request.body;
    let params = {};

    // Caso um id seja passado
    if (comboId) {
      params = {
        where: {
          id: comboId,
        },
      };
    }

    const combo = await Combo.GetMany(params);
    const list = Object.values({ ...combo.data });

    if (combo.error || !list.length)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Combo",
        })
        .status(500);

    // Carrega as pizzas no objeto
    request.body = { list };
    const combos = await BuildComboItens(request);

    return response.send(combos).status(200);
  }

  async GetFlavors(request, response) {
    const { flavorId } = request.body;

    let params = {};
    if (flavorId) {
      params = {
        where: {
          id: flavorId,
        },
      };
    }
    const flavors = await PizzaFlavor.GetMany(params);

    if (flavors.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Flavors",
        })
        .status(500);

    return response.send(Object.values({ ...flavors.data })).status(200);
  }

  async GetDrinks(request, response) {
    const drinks = await BuildDrinks(request);
    return response.send(Object.values({ ...drinks })).status(200);
  }

  async GetPizzas(request, response) {
    const list = await BuildPizza(request);
    return response.send(Object.values(list)).status(200);
  }
}

export default StockController;
