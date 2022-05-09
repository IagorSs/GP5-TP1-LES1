import Controller from "./database/controller.js";
import {
  BuildPizza,
  BuildDrinks,
  BuildComboItens,
  BuildOrder,
} from "../utils/StockUtils.js";

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
    const { Pizzas, Drinks, Combos, Observation, UserId, Total } = request.body;
    const params = {
      data: {
        Pizzas: this.arrayParams(Pizzas),
        Drinks: this.arrayParams(Drinks),
        Combos: this.arrayParams(Combos),
        User: {
          connect: { id: UserId },
        },
        Total,
        Date: new Date(),
        Observation: [Observation ? Observation : "Nenhuma observação ", " "],
      },
    };

    const order = await Order.Create(params);

    if (order.error)
      return response
        .send({
          Errro: true,
          message: "Server error. Can't create a new Order",
        })
        .status(501);

    response.send({ message: "Seu pedido foi enviado" }).status(200);
  }

  async GetOrder(request, response) {
    const { orderId } = request.body;

    let params = {};

    if (orderId) {
      // Pesquisa por id
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

    // Converte o objeto para um vetor de ordens
    const list = Object.values({ ...order.data });
    request.body = { list };
    const orders = await BuildOrder(request);

    response.send(orders).status(200);
  }

  // Busca pelos pedidos em aberto
  async GetQueuebyStatus(request, response) {
    const { Status } = request.body;
    const params = {
      where: {
        Status,
      },
    };

    const order = await Order.GetMany(params);

    if (order.error)
      return response.send({
        Errro: true,
        message: "Server error. Can't load Orders",
      });

    // Converte o objeto para um vetor de ordens
    const list = Object.values({ ...order.data });
    request.body = { list };
    const orders = await BuildOrder(request);
    response.send(orders);
  }

  async UpdateStatusOrder(request, response) {
    const { orderId, Status } = request.body;

    const params = {
      where: {
        id: orderId,
      },
      data: {
        Status,
      },
    };

    const order = await Order.Update(params);

    if (order.error || !Object.keys(order.data).length)
      return response
        .send({ message: "Não foi possível fazer a alteração" })
        .status(501);

    return response.send({ message: "Pedido atualizado" }).status(200);
  }

  async CancelOrder(request, response) {
    const { orderId, Observation } = request.body;

    let params = {
      where: {
        id: orderId,
      },
    };

    const order = await Order.GetOne(params);

    if (order.error || !Object.keys(order.data).length)
      return response
        .send({ message: "Não foi possível localizar a ordem" })
        .status(501);

    const message = order.data.Observation;
    message[1] = Observation || "Motivo não informado";

    params = {
      where: {
        id: orderId,
      },
      data: {
        Status: "Cancelado",
        Observation: message,
      },
    };

    const canceled = await Order.Update(params);

    if (canceled.error || !Object.keys(canceled.data).length)
      return response
        .send({ message: "Não foi possível fazer a alteração" })
        .status(501);

    return response.send({ message: "This order was cancelled" }).status(200);
  }
}

export default OrderController;

/*
  Recebido
  Preparando
  Enviado
*/
