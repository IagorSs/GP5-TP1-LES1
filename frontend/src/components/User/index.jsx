import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";

function User() {
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [birthDay, setBirthDay] = useState();
  const [password, setPassword] = useState();
  let userRegister = [];

  async function handleSetUser() {
    let user = {
      Name: name,
      CPF: cpf,
      Email: email,
      Birthday: birthDay,
      Password: password,
    };

    console.log(user);
    userRegister.push(user);
    localStorage.setItem("user", JSON.stringify(userRegister));
  }

  useEffect(() => {
    handleSetUser();
  });

  return (
    <section>
      <Box>
        <div>
          <TextField
            required
            id="name-required"
            label="Nome"
            variant="standard"
            onChange={(newValue) => {
              setName(newValue.target.value);
            }}
          />
          <TextField
            required
            id="cpf-required"
            label="CPF"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(newValue) => {
              setCpf(newValue.target.value);
            }}
          />
          <TextField
            required
            id="email-required"
            label="Email"
            variant="standard"
            onChange={(newValue) => {
              setEmail(newValue.target.value);
            }}
          />
          <TextField
            required
            id="password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(newValue) => {
              setPassword(newValue.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              required
              inputFormat="dd/MM/yyyy"
              label="Data de Nascimento"
              value={birthDay}
              onChange={(newValue) => {
                setBirthDay(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </Box>
    </section>
  );
}

export default User;
