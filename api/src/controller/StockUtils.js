import Controller from "./database/controller.js";
const Pizza = new Controller("Pizza");
const PizzaFlavor = new Controller("PizzaFlavor");
const Drink = new Controller("Drink");
const Combo = new Controller("Combo");

const LoadFlavors = async (pizza) => {
  const params = {
    where: {
      id: { in: pizza.Flavor },
    },
  };

  const flavors = await PizzaFlavor.GetMany(params);

  return Object.values({ ...flavors.data });
};

//
const BuildPizza = async (request, response) => {
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
    list[index].Flavor = await LoadFlavors(list[index]);
  }
  return list;
};

const BuildDrinks = async (request, response) => {
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

  return Object.values({ ...drinks.data });
};

export { BuildPizza, BuildDrinks };
