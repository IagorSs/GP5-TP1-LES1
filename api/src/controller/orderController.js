import Controller from "./database/controller.js";

const Ortder = new Controller("Order");

class OrderController {
  arrayParams(idString) {
    let params = [];
    if (!idString) return params;

    const idArray = idString.split(",");

    idArray.map((id) => {
      params.push({ id: id });
    });

    return params;
  }

  async CreateOrder(request, response) {
    const { Pizzas, Drinks, Combos } = request.body;
    const User = "6271c867ec5a14eb69406997";
    const params = {
      data: {
        Pizzas: {
          connect: this.arrayParams(Pizzas),
        },
        Drinks: {
          connect: this.arrayParams(Drinks),
        },
        Combos: {
          connect: this.arrayParams(Combos),
        },
        User,
        Total: 15.3,
        Date: new Date(),
      },
    };

    response.send({ ...params });
  }
}

export default OrderController;
