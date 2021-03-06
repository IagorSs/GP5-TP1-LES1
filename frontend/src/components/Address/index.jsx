import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import zipcode from "../../services/zipcode";
import "./style.css";

export default function Address() {
  const { control, watch, setValue } = useFormContext();

  const cep = watch("Zipcode");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState("");

  useEffect(() => {
    async function fetchAddress() {
      const { data, status } = await zipcode(cep);

      // TODO resposta de erro pro usuário
      if (status === 200) {
        setStreet(data.address + " / " + data.district);
      }
    }

    if (cep.length === 8) fetchAddress();
  }, [cep]);

  useEffect(() => {
    let completeAddress = street;

    if (number) completeAddress += `, ${number}`;
    if (complement) completeAddress += `, ${complement}`;

    setValue("Address", completeAddress);
  }, [street, number, complement, setValue]);

  return (
    <div className="main-address">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <div className="main-address">
          <div className="cepSearch">
            <Controller
              name="Zipcode"
              control={control}
              render={({ field }) => (
                <TextField required type="number" label="CEP" {...field} />
              )}
            />
          </div>

          <TextField
            label="Endereço"
            value={street}
            disabled
            required
            variant="standard"
          />

          <TextField
            label="Número"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            required
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
        </div>
      </Box>
    </div>
  );
}
