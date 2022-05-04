import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import zipcode from "../../services/zipcode";
import "./style.css";

export default function Endereco() {
  const [address, setAddress] = useState();
  const [street, setStreet] = useState();
  const [cityState, setCityState] = useState();
  const [cep, setCEP] = useState();

  async function handleChangeCEP(e) {
    setCEP(e.target.value);
  }

  async function handleGetAddress() {
    setAddress(await zipcode(cep));
  }

  async function handleSetAddressComplet() {
    if (address && address.status === 200) {
      setStreet(address.data.logradouro);
      setCityState(address.data.localidade + " / " + address.data.uf);
    }
  }

  useEffect(() => {
    handleGetAddress();
    handleSetAddressComplet();
  });

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
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-cep">CEP</InputLabel>
              <OutlinedInput
                id="cep-required"
                onChange={async (e) => handleChangeCEP(e)}
                variant="standard"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleGetAddress} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="CEP"
              />
            </FormControl>
          </div>

          <TextField
            id="address-street"
            label={street ? "" : "Rua"}
            value={street}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
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
            id="address-complement"
            label="Complemento"
            variant="standard"
          />
          <TextField
            id="address-complete"
            label={cityState ? "" : "Cidade, Estado"}
            value={cityState}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </div>
      </Box>
    </div>
  );
}
