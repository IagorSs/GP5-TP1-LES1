import Controller from "./database/controller.js";

const Pizza = new Controller("Pizza");
const PizzaFlavor = new Controller("PizzaFlavor");
const Drink = new Controller("Drink");

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
    const { Name, Description, Size, Price, Quantity } = request.body;

    const params = {
      data: {
        Name,
        Description,
        Size,
        Price: parseFloat(Price),
        Quantity: parseInt(Quantity),
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
    const { Flavors, Name, Size, Price } = request.body;

    const [flavor0, flavor1] = Flavors.split(",");

    const params = {
      data: {
        Flavor: {
          connect: [{ id: flavor0 }, flavor1 ? { id: flavor1 } : undefined],
        },
        Name,
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

  async GetFlavors(request, response) {
    const flavors = await PizzaFlavor.GetMany();

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
    const drinks = await Drink.GetMany();

    if (drinks.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't load Flavors",
        })
        .status(500);

    return response.send({ ...drinks.data }).status(200);
  }
}

export default StockController;
