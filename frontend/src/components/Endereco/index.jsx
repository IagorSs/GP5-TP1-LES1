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
  const [cep, setCEP] = useState();

  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [complement, setComplement] = useState();
  const [neightboardCityState, setNeightboardCityState] = useState();
  let addressRegister = [];

  async function handleChangeCEP(e) {
    setCEP(e.target.value);
  }

  async function handleGetAddress() {
    setAddress(await zipcode(cep));
    console.log(address);
  }

  async function handleSetAddressComplet() {
    if (address && address.status === 200) {
      console.log(address);
      setStreet(address.data.address);
      setNeightboardCityState(
        address.data.district +
          " / " +
          address.data.city +
          " / " +
          address.data.state
      );
    }
  }

  async function handleSetAddress() {
    let addressData = {
      Zipcode: cep,
      Address:
        street +
        ", " +
        number +
        " - " +
        complement +
        " - " +
        neightboardCityState,
    };
    addressRegister.push(addressData);
    localStorage.setItem("address", JSON.stringify(addressRegister));
  }

  useEffect(() => {
    handleGetAddress();
    handleSetAddressComplet();
    handleSetAddress();
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
                required
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
            // value={number}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(newValue) => {
              setNumber(newValue.target.value);
            }}
          />
          <TextField
            id="address-complement"
            label="Complemento"
            variant="standard"
            onChange={(newValue) => {
              setComplement(newValue.target.value);
            }}
          />
          <TextField
            id="address-complete"
            label={neightboardCityState ? "" : "Bairro, Cidade, Estado"}
            value={neightboardCityState}
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
