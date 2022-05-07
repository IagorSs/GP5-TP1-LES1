import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import Endereco from "../../components/Endereco";
import User from "../../components/User";
// import * as UserService from "../../services/user";
import "./style.css";

export default function CadastroUsuario() {
  async function handleInsertUser() {
    let userInfos = JSON.parse(localStorage.getItem("user"));
    let addressInfos = JSON.parse(localStorage.getItem("address"));

    // console.log(userInfos);
    // console.log(addressInfos);
    // let index = productsStorage.findIndex((item) => item.id === product.id);
    // productsStorage.splice(index, 1);
    // localStorage.setItem("cart", JSON.stringify(productsStorage));
    // window.location.reload();
  }

  return (
    <section className="userRegister-main">
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
          <Endereco />
        </div>
      </Box>
      <Button
        className="button-register"
        variant="contained"
        onClick={() => {
          // alert("apertou no botao cadastrar usuario");
          handleInsertUser();
        }}
        endIcon={<BadgeIcon />}
      >
        Cadastrar
      </Button>
    </section>
  );
}
