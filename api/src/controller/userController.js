import Controller from "./database/controller.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class UserController extends Controller {
  constructor() {
    super("User");
  }

  // Cria um hash com a senha do usuário
  HashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
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
      return response.send({ error: true, message: "CPF já cadastrado" });

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
      return response.send({
        message: "CPF ou senha incorretos",
      });

    // Envia um token para o cliente
    const { _id, Name, Permission } = user.data;
    const payload = {
      _id,
      Name,
      Permission,
    };

    const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY_TOKEN, {
      expiresIn: "8h",
    });

    // Return token to client
    return response.send({ token });
  }
}

export default UserController;
