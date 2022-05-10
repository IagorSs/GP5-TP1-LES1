import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import zipcode from "../../services/zipcode";
import "./style.css";

export default function Address() {
  const [cep, setCEP] = useState("");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  function handleChangeCEP({ target: { value } }) {
    setCEP(value.toString());
  }

  useEffect(() => {
    async function fetchAddress() {
      const { data, status } = await zipcode(cep);

      // TODO resposta de erro pro usuário
      if (status === 200) {
        setStreet(data.address);
      }
    }

    if (cep.length === 8) fetchAddress();
  }, [cep]);

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
            {window.location.pathname !== "/user" ? (
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-cep">
                  CEP
                </InputLabel>
                <OutlinedInput
                  id="cep-required"
                  onChange={handleChangeCEP}
                  variant="standard"
                  type="number"
                  label="CEP *"
                />
              </FormControl>
            ) : (
              <></>
            )}
          </div>

          <TextField
            id="address-street"
            label="Endereço"
            value={street}
            disabled
            variant="outlined"
          />

          {window.location.pathname !== "/user" ? (
            <>
              <TextField
                required
                id="address-number"
                label="Número"
                type="number"
                // value={number}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                variant="standard"
                onChange={(newValue) => {
                  setNumber(newValue.target.value);
                }}
              />
              <TextField
                id="address-complement"
                label="Complemento"
                variant="standard"
                value={complement}
                onChange={(newValue) => {
                  setComplement(newValue.target.value);
                }}
              />
            </>
          ) : (
            <>
              <TextField
                id="address-number"
                label="Número"
                type="number"
                value={number}
                variant="standard"
                onChange={(newValue) => {
                  setNumber(newValue.target.value);
                }}
                disabled
              />

              <TextField
                id="address-complement"
                label="Complemento"
                variant="standard"
                value={complement}
                onChange={(newValue) => {
                  setComplement(newValue.target.value);
                }}
                disabled
              />
            </>
          )}
        </div>
      </Box>
    </div>
  );
}
