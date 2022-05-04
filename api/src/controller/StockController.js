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
          message: "Server error to create a new Flavor",
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
          message: "Server error to create a new Drink",
        })
        .status(500);

    return response.send({ message: "Drink created!" }).status(200);
  }


}

export default StockController;
