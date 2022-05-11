import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
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
import Link from "../../components/Link";
import { login, setUserToken } from '../../services/user';
import { AuthContext } from '../../auth/AuthContext';

import "./style.css";

export default function InputAdornments() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      CPF: "",
      Password: ""
    }
  });

  const submitLogin = (data) => login(data, setUser);

  useEffect(() => {
    const jwtUserToken = window.localStorage.getItem("@pizzaria-pizzada/user-token");

    if (jwtUserToken) setUserToken(jwtUserToken, setUser);
  }, []);

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} className="main-login">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        <Box>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <Controller
            name="CPF"
            control={control}
            render={({ field }) => <TextField {...field} label="CPF" variant="standard" />}
          />
        </Box>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Controller
            name="Password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
        </FormControl>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Entrar
        </Button>
      </form>

      <Link to="/user/register">
        <Button variant="outlined" startIcon={<BadgeIcon />}>
          Cadastrar
        </Button>
      </Link>
    </Box>
  );
}
