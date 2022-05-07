import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Pizza, Drink } from "../../../../models/products";

import "./style.css";

// TODO buscar isso do backend
const SIZE_COMBO = {
  U: "Único",
};
const SIZES_PIZZA = {
  P: "4 Fatias",
  M: "6 Fatias",
  G: "8 Fatias",
  GG: "10 Fatias",
};

const SIZES_DRINK = {
  1: "1L",
  2: "2L",
  3: "3L",
};

function ProductDescription({ product }) {
  const [size, setSize] = useState(product.Size);

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    product.Size = size;
  });

  return (
    <div>
      <Card>
        <CardMedia component="img" height="250" image={product.Url} />
        <CardContent>
          <h2>{product.Name}</h2>
          <Typography>{product.Description}</Typography>

          <FormControl className="input-size" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="size-select">Tamanho</InputLabel>

            <Select
              id="size-select"
              value={size}
              onChange={handleChangeSize}
              autoWidth
              label="Tamanho"
            >
              {/* {Object.entries(
                // FIXME: os produtos estao instaciados de maneira incorreta no carrinho
                product instanceof Pizza
                  ? SIZES_PIZZA
                  : product instanceof Drink
                  ? SIZES_DRINK
                  : SIZES_DRINK
              ).map(([value, description]) => (
                <MenuItem key={value} value={value}>
                  {description}
                </MenuItem>
              ))} */}

              {Object.entries(
                product.Type === "Pizza"
                  ? SIZES_PIZZA
                  : product.Type === "Drink"
                  ? SIZES_DRINK
                  : SIZE_COMBO
              ).map(([value, description]) => (
                <MenuItem key={value} value={value}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDescription;
