import Controller from "./database/controller.js";
import bcrypt from "bcrypt";

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

  async Login (request, response){

    



  }


}

export default UserController;
