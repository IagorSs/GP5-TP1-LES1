import Controller from "./database/controller.js";

const Order = new Controller("Order");

class OrderController {
  arrayParams(idString) {
    let params = [];
    if (!idString) return params;

    const idArray = idString.split(",");

    idArray.map((id) => {
      params.push(id);
    });

    return params;
  }

  async CreateOrder(request, response) {
    const { Pizzas, Drinks, Combos } = request.body;
    const User = "6271c867ec5a14eb69406997";
    const params = {
      data: {
        Pizzas: this.arrayParams(Pizzas),
        Drinks: this.arrayParams(Drinks),
        Combos: this.arrayParams(Combos),
        User: {
          connect: { id: User },
        },
        Total: 15.3,
        Date: new Date(),
      },
    };

    const order = await Order.Create(params);

    if (order.error)
      return response.send({
        Errro: true,
        message: "Server error. Can't create a new Order",
      });

    response.send({ ...order.data });
  }

  async GetOrders(request, response) {
    const { orderId } = request.body;

    let params = {};
    
    if(orderId) {
      params = {
        where: {
          id: orderId,
        },
      };
    }

    const order = await Order.GetMany(params);

    if (order.error)
      return response.send({
        Errro: true,
        message: "Server error. Can't load Orders",
      });

    response.send({ ...order.data });
  }
}

export default OrderController;
