import Controller from "./database/controller.js";
import {
  BuildPizza,
  BuildDrinks,
  BuildComboItens,
  BuildOrder,
} from "../utils/StockUtils.js";

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
    const { Flavor, Name, Size, Price, Url } = request.body;

    const params = {
      data: {
        Flavor: Flavor.split(","),
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
    const { Name, Description, Pizzas, Drinks, Price, Url } = request.body;

    const params = {
      data: {
        Name,
        Description,
        Url,
        Pizzas: !Pizzas ? [] : Pizzas.split(","),
        Drinks: !Drinks ? [] : Drinks.split(","),
        Price: parseFloat(Price),
      },
    };

    console.log(params);

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

    if (combo.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Combo",
        })
        .status(500);

    if (!list.length) return response.send([]).status(200);

    // Carrega as pizzas no objeto
    request.body = { list };
    const combos = await BuildComboItens(request);

    if (combos.message) return response.send({ ...combos.message }).status(500);

    return response.send(combos).status(200);
  }

  async SearchCombo(request, response) {
    const { Description } = request.body;

    const params = {
      where: {
        Description: {
          contains: Description,
        },
      },
    };

    console.log(params);

    const combo = await Combo.GetMany(params);

    const list = Object.values({ ...combo.data });

    if (combo.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Combo",
        })
        .status(500);

    if (!list.length) return response.send([]).status(200);
    // Carrega as pizzas no objeto
    request.body = { list };
    const combos = await BuildComboItens(request);
    if (combos.message) return response.send({ ...combos.message }).status(500);

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

    if (drinks.message) return response.send({ ...drinks.message }).status(500);
    return response.send(drinks).status(200);
  }

  async GetPizzas(request, response) {
    const list = await BuildPizza(request);
    if (list.message) return response.send({ ...list.message }).status(500);
    return response.send(list).status(200);
  }

  async SearchPizza(request, response) {
    const params = {
      where: {
        ...request.body,
      },
    };

    const pizzas = await Pizza.GetMany(params);

    if (pizzas.error)
      return response
        .send({
          Errro: true,
          message: "Invalid params",
        })
        .status(500);

    const list = Object.values(pizzas.data);

    if (!list.length) return response.send([]).status(200);

    request.body = { list };
    const pizza = await BuildPizza(request);
    if (pizza.message) return response.send({ ...pizza.message }).status(500);

    return response.send(pizza).status(200);
  }

  async SearchDrink(request, response) {
    const params = {
      where: {
        ...request.body,
      },
    };

    const drinks = await Drink.GetMany(params);

    if (drinks.error)
      return response
        .send({
          Errro: true,
          message: "Invalid params",
        })
        .status(500);

    const list = Object.values(drinks.data);

    if (!list.length) return response.send([]).status(200);

    request.body = { list };
    const drink = await BuildDrinks(request);
    if (drink.message) return response.send({ ...drink.message }).status(500);

    return response.send(list).status(200);
  }
}

export default StockController;
