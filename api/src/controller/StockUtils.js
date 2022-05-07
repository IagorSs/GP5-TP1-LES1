import Controller from "./database/controller.js";
const Pizza = new Controller("Pizza");
const PizzaFlavor = new Controller("PizzaFlavor");
const Drink = new Controller("Drink");

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
const BuildPizza = async (request) => {
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
  if (pizzas.error) return { message: "Server error. Can't load Pizzas" };

  const list = Object.values(pizzas.data);

  for (let index = 0; index < list.length; index++) {
    list[index].Flavor = await LoadFlavors(list[index]);
  }
  return list;
};

const BuildDrinks = async (request) => {
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

  if (drinks.error) return { message: "Server error. Can't load Drinks" };

  return Object.values({ ...drinks.data });
};

const BuildCombo = async (request) => {
  const { list } = request.body;

  if (!list || !list.length) return [];

  for (let index = 0; index < list.length; index++) {
    // Params recebe o vetor de ids
    const params = {
      in: list[index].Pizzas,
    };
    request.body = {
      pizzaId: params,
    };
    list[index].Pizzas = await BuildPizza(request);
  }

  // Carrega os drinks no objeto
  for (let index = 0; index < list.length; index++) {
    // Params recebe o vetor de ids
    const params = {
      in: list[index].Drinks,
    };
    request.body = {
      pizzaId: params,
    };
    list[index].Drinks = await BuildDrinks(request);
  }

  return list;
};

export { BuildPizza, BuildDrinks, BuildCombo };
