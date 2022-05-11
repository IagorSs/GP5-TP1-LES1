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
      return response.status(500).send({
        Errro: true,
        message: "Server error. Can't create a new Drink",
      });

    return response.status(200).send({ ...drink.data });
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
      return response.status(500).send({
        Errro: true,
        message: "Server error. Can't create a new Pizza",
      });

    request.body = { pizzaId: pizza.data.id };
    const pizzas = await BuildPizza(request);

    if (pizzas.message) return response.status(500).send({ ...pizzas.message });

    return response.send(pizzas).status(200);
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

    const combo = await Combo.Create(params);

    if (combo.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Combo",
        })
        .status(500);

    return response.status(200).send({ message: "Combo created!" });
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

    if (!list.length) return response.status(200).send([]);

    // Carrega as pizzas no objeto
    request.body = { list };
    const combos = await BuildComboItens(request);

    if (combos.message) return response.status(500).send({ ...combos.message });

    return response.status(200).send(combos);
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

    if (!list.length) return response.status(200).send([]);
    // Carrega as pizzas no objeto
    request.body = { list };
    const combos = await BuildComboItens(request);
    if (combos.message) return response.status(500).send({ ...combos.message });

    return response.status(200).send(combos);
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

    return response.status(200).send(Object.values({ ...flavors.data }));
  }

  async GetDrinks(request, response) {
    const drinks = await BuildDrinks(request);

    if (drinks.message) return response.status(500).send({ ...drinks.message });
    return response.status(200).send(drinks);
  }

  async GetPizzas(request, response) {
    const list = await BuildPizza(request);
    if (list.message) return response.status(500).send({ ...list.message });
    return response.status(200).send(list);
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

    if (!list.length) return response.status(200).send([]);

    request.body = { list };
    const pizza = await BuildPizza(request);
    if (pizza.message) return response.status(500).send({ ...pizza.message });

    return response.status(200).send(pizza);
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

    if (!list.length) return response.status(200).send([]);

    request.body = { list };
    const drink = await BuildDrinks(request);
    if (drink.message) return response.status(500).send({ ...drink.message });

    return response.status(200).send(list);
  }
}

export default StockController;
