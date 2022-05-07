import Controller from "./database/controller.js";
import { BuildPizza, BuildDrinks, BuildCombo } from "./StockUtils.js";
const Combo = new Controller("Combo");

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

    // Carrega as pizzas
    for (let index = 0; index < list.length; index++) {
      const params = {
        in: list[index].Pizzas,
      };
      request.body = {
        pizzaId: params,
      };
      // Busca no banco a lista de Pizzas da ordem
      list[index].Pizzas = await BuildPizza(request);
    }

    // Carrega as bebidas
    for (let index = 0; index < list.length; index++) {
      const params = {
        in: list[index].Drinks,
      };
      request.body = {
        drinkId: params,
      };
      // Busca no banco a lista de bebidas da ordem
      list[index].Drinks = await BuildDrinks(request);
    }

    // Carrega combos
    for (let index = 0; index < list.length; index++) {
      if (list[index].Combos.length) {
        const params = {
          where: {
            id: { in: list[index].Combos },
          },
        };

        // Carrega um objeto contendo todos os combos da ordem
        const combos = await Combo.GetMany(params);

        // Gera um lista de combos
        request.body = {
          list: Object.values({ ...combos.data }),
        };
        // Carrega o conteúdo de cada combo no objeto
        list[index].Combo = await BuildCombo(request);
      }
    }

    response.send(list);
  }

  // Busca pelos pedidos em aberto
  async GetQueue(request, response) {
    response.send("Fila");
  }

  // Busca pelos pedidos em preparando
  async getPreparing(request, response) {
    response.send("Fila");
  }

  // Busca pelos pedidos enviados
  async GetSent(request, response) {
    response.send("Fila");
  }

  // Busca pelos pedidos concluídos
  async GetDone(request, response) {
    response.send("Fila");
  }
}

export default OrderController;

/*
  Recebido
  Preparando
  Enviado
*/
