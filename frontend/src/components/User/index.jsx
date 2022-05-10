import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";
import { useFormContext, Controller } from 'react-hook-form';

function User() {
  const { control } = useFormContext();

  return (
    <Box component="section">
      <Controller
        name="Name"
        control={control}
        render={({ field }) => (
          <TextField
            required
            label="Nome"
            variant="standard"
            {...field}
          />
        )}
      />

      <Controller
        name="CPF"
        control={control}
        render={({ field }) => (
          <TextField
            required
            label="CPF"
            type="number"
            variant="standard"
            {...field}
          />
        )}
      />

      <Controller
        name="Password"
        control={control}
        render={({ field }) => (
          <TextField
            required
            label="Senha"
            type="password"
            variant="standard"
            {...field}
          />
        )}
      />

      <Controller
        name="Birthday"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Data de Nascimento"
              renderInput={(params) => <TextField required variant="standard" {...params} />}
              {...field}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
}

export default User;
