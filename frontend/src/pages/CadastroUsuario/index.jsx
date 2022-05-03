import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";

import Endereco from "../../components/Endereco";
import "./style.css";

export default function CadastroUsuario() {
  const [value, setValue] = React.useState(null);

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
          <TextField
            required
            id="name-required"
            label="Nome"
            variant="standard"
          />
          <TextField
            required
            id="login-required"
            label="Login"
            variant="standard"
          />
          <TextField
            id="password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data de Nascimento"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div className="user-address">
          <h3 className="address-infos-title">Dados de Endereço</h3>
          <Endereco />
        </div>
      </Box>
      <Button
        className="button-register"
        variant="text"
        endIcon={<BadgeIcon />}
      >
        Cadastrar
      </Button>
    </section>
  );
}
