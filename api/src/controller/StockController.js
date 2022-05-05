import Controller from "./database/controller.js";

const Pizza = new Controller("Pizza");
const PizzaFlavor = new Controller("PizzaFlavor");
const Drink = new Controller("Drink");
const Combo = new Controller("Combo");

class StockController {
  // Busca no banco de sabores de pizza para retornar no objeto
  async LoadFlavors(pizza) {
    const params = {
      where: {
        id: { in: pizza.Flavor },
      },
    };

    const flavors = await PizzaFlavor.GetMany(params);

    return { ...flavors.data };
  }

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

    return response.send({ ...flavors.data }).status(200);
  }

  async GetDrinks(request, response) {
    const { drinkId } = request.body;

    let params = {};
    if (drinkId) {
      params = {
        where: {
          id: drinkId,
        },
      };
    }
    const drinks = await Drink.GetMany(params);

    if (drinks.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Drinks",
        })
        .status(500);

    return response.send({ ...drinks.data }).status(200);
  }

  async GetPizzas(request, response) {
    const { pizzaId } = request.body;

    let params = {};
    if (pizzaId) {
      params = {
        where: {
          id: pizzaId,
        },
      };
    }

    const pizzas = await Pizza.GetMany(params);
    if (pizzas.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Pizzas",
        })
        .status(500);

    const list = Object.values(pizzas.data);

    for (let index = 0; index < list.length; index++) {
      list[index].Flavor = await this.LoadFlavors(list[index]);
    }
    const data = Object.values(list);
    return response.send(data).status(200);
  }
}

export default StockController;
