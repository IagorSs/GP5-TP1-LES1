import Controller from "./database/controller.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Decode from "../utils/decode.js";
import { BuildOrder } from "../utils/StockUtils.js";

const Order = new Controller("Order");
class UserController extends Controller {
  constructor() {
    super("User");
  }

  // Cria um hash com a senha do usuário
  HashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  arrayParams(idString) {
    let params = [];
    if (!idString) return params;

    const idArray = idString.split(",");

    idArray.map((id) => {
      params.push(id);
    });

    return params;
  }

  async Create(request, response) {
    const { CPF } = request.body;

    // Verifica se o CPF já está em uso
    const params = {
      where: {
        CPF,
      },
    };
    const check_CPF = await super.GetOne(params);
    //Se sim, para o processo
    if (check_CPF.data)
      return response
        .send({ error: true, message: "CPF já cadastrado" })
        .status(501);

    const { Name, Birthday, Password, Zipcode, Address } = request.body;

    const user_params = {
      data: {
        Name,
        CPF,
        Birthday: new Date(Birthday),
        Password: this.HashPassword(Password),
        Zipcode,
        Address,
      },
    };

    const newUser = await super.Create(user_params);

    if (newUser.error || !newUser.data)
      return response.send({
        error: true,
        message: "Não foi possível criar o usuário",
      });
    response.send({ message: "Usuário criado" });
  }

  async Login(request, response) {
    const { CPF, Password } = request.body;

    const params = {
      where: {
        CPF,
      },
    };

    const user = await super.GetOne(params);

    if (user.error)
      return response.send({ message: "Can't locate user" }).status(500);
    if (!user.data)
      return response
        .send({
          message: "CPF ou senha incorretos",
        })
        .status(501);

    const hashPassword = user.data.Password;
    const hash = bcrypt.compareSync(Password, hashPassword);
    if (!hash)
      return response
        .send({
          message: "CPF ou senha incorretos",
        })
        .status(501);

    // Envia um token para o cliente
    const { id, Name, Permission } = user.data;
    const payload = {
      id,
      Name,
      Permission,
    };

    const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY_TOKEN, {
      expiresIn: "8h",
    });

    // Return token to client
    return response.send({ token });
  }

  async CreateOrder(request, response) {
    const { Pizzas, Drinks, Combos, Observation, Total } = request.body;

    const { id } = await Decode(request.headers);

    if (!id) return response.send({ message: "A valid token is missing" });

    const params = {
      data: {
        Pizzas: this.arrayParams(Pizzas),
        Drinks: this.arrayParams(Drinks),
        Combos: this.arrayParams(Combos),
        User: {
          connect: { id },
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
    const { id } = await Decode(request.headers);

    const { orderId } = request.body;

    if (!id) return response.send({ message: "A valid token is missing" });
    if (!orderId)
      return response.send({ message: "order reference is missing" });

    const params = {
      where: {
        id: orderId,
        User: id,
      },
    };
    const order = await Order.GetOne(params);

    const list = Object.values({ ...order.data });

    if (order.error) {
      return response.send({ message: "Can't load order" }).status(500);
    }

    if (!list.length) {
      response.send(list).status(200);
    }

    request.body = { list };
    const orders = await BuildOrder(request);

    response.send(orders).status(200);
  }

  async GetHistory(request, response) {
    const { id } = await Decode(request.headers);

    if (!id) return response.send({ message: "A valid token is missing" });

    const params = {
      where: {
        id,
      },
      include: {
        Orders: true,
      },
    };

    const order = await super.GetOne(params);

    console.log(order);

    const list = Object.values({ ...order.data.Orders }).reverse();

    if (order.error) {
      return response.send({ message: "Can't load order" }).status(500);
    }

    if (!list.length) {
      response.send(list).status(200);
    }

    request.body = { list };
    const orders = await BuildOrder(request);

    response.send(orders).status(200);
  }
}

export default UserController;
