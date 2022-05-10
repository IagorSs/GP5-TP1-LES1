import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from 'react-hook-form';
import zipcode from "../../services/zipcode";
import "./style.css";
  
export default function Address() {
  const { control , watch, setValue } = useFormContext();

  const cep = watch("Zipcode");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  useEffect(() => {
    async function fetchAddress () {
      const { data, status } = await zipcode(cep);

      // TODO resposta de erro pro usuário
      if (status === 200) {
        setStreet(data.address);
      }
    }

    if (cep.length === 8) fetchAddress();
  }, [cep]);

  useEffect(() => {
    let completeAddress = street;

    if(number) completeAddress += `, ${number}`;
    if(complement) completeAddress += `, ${complement}`;

    setValue("Address", completeAddress);
  }, [street, number, complement, setValue]);

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
            {window.location.pathname !== "/user" && (
              <Controller
                name="Zipcode"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    type="number"
                    label="CEP"
                    {...field}
                  />
                )}
              />
            )}
          </div>

          <TextField
            label="Endereço"
            value={street}
            disabled
            variant="standard"
          />

          {window.location.pathname !== "/user" ? (
            <>
              <TextField
                label="Número"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(newValue) => {
                  setNumber(newValue.target.value);
                }}
              />
              <TextField
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
                label="Número"
                type="number"
                value={number}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(newValue) => {
                  setNumber(newValue.target.value);
                }}
              />

              <TextField
                label="Complemento"
                variant="standard"
                value={complement}
                onChange={(newValue) => {
                  setComplement(newValue.target.value);
                }}
              />
            </>
          )}
        </div>
      </Box>
    </div>
  );
}
