import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

export default function Endereco() {
  return (
    <div className="main-address">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="main-address">
          <div className="cepSearch">
            <TextField
              required
              id="cep-required"
              label="CEP"
              variant="standard"
            />
            <Button
              variant="outlined"
              endIcon={<SearchIcon />}
              onClick={() => {
                alert("Clicou no pesquisa cep");
              }}
            >
              {" "}
              Localizar{" "}
            </Button>
          </div>

          <TextField
            id="address-read-only-input"
            label="Endereço"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            id="address-number"
            label="Número"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="neighborhood-number"
            label="Bairro"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="city-number"
            label="Cidade"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            id="state-number"
            label="Estado"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            id="country-number"
            label="País"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
      </Box>
    </div>
  );
}
