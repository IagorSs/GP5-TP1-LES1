import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import BadgeIcon from "@mui/icons-material/Badge";
import Link from "@mui/material/Link";
import "./style.css";

export default function InputAdornments() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} className="main-login">
      <h1 className="login-title">Login</h1>
      <div className="dados">
        <Box>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="input-user" label="Usuário" variant="standard" />
        </Box>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => {
          alert("clicou entrar");
        }}
      >
        Entrar
      </Button>

      <Link href="/user/register">
        <Button variant="outlined" startIcon={<BadgeIcon />}>
          Cadastrar
        </Button>
      </Link>
    </Box>
  );
}
