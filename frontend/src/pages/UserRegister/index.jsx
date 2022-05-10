import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import Address from "../../components/Address";
import User from "../../components/User";
import * as UserService from "../../services/user";
import { useForm, FormProvider } from 'react-hook-form';
import "./style.css";

export default function CadastroUsuario() {
  const methods = useForm({
    defaultValues: {
      Name: "",
      Birthday: new Date(),
      Password: "",
      Zipcode: "",
      Address: "",
      CPF: ""
    }
  });

  const onSubmit = async (forms) => {
    const loginReqBody = {
      ...forms,
      Birthday: forms.Birthday.toISOString().split('T')[0]
    };

    const res = await UserService.register(loginReqBody);

    // TODO implementar resposta pro usuário
    if (res.status === 200) alert("Usuário registrado com sucesso");
  }

  return (
    <FormProvider {...methods}>
      <form className="userRegister-main" onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="userRegister-title">Cadastro de Usuários</h1>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="user-infos">
            <h3 className="user-infos-title">Dados cadastrais</h3>
            <User />
          </div>

          <div className="user-address">
            <h3 className="address-infos-title">Dados de Endereço</h3>
            <Address />
          </div>
        </Box>
        <Button
          className="button-register"
          variant="contained"
          endIcon={<BadgeIcon />}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </FormProvider>
  );
}
