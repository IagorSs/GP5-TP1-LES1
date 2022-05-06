import { useState } from "react";
import Card from "@mui/material/Card";
import ProductDescription from "../Description";
import ProductForCart from "../ForCart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.css";

// TODO buscar isso do backend
const FLAVORS_PIZZA = {
  ID1: "Mussarela",
  ID2: "Calabresa",
  ID3: "Peperoni",
  ID4: "Portuguesa",
};

function Pizza({ product }) {
  const [flavorOne, setFlavorOne] = useState("");
  const [flavorTwo, setFlavorTwo] = useState("");

  async function handleSetFlavor(newValue, flavor) {
    if (flavor === 0) {
      setFlavorOne(newValue);
    } else {
      setFlavorTwo(newValue);
    }
  }

  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription key={product.id} product={product} />
        <div className="flavors-pizza">
          {/* {Object.entries(LABELS).map(([value]) => (
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel>1/2</InputLabel>
              <Select
                id={"pizza-select" + value}
                value={value === 0 ? flavorOne : flavorTwo}
                onChange={(newValue) =>
                  handleSetFlavor(newValue.target.value, value)
                }
                autoWidth
                label="1/2"
              >
                {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                  <MenuItem key={key} value={key}>
                    {description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))} */}

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>1/2</InputLabel>
            <Select
              id={"pizza-select" + 0}
              value={flavorOne}
              onChange={(newValue) => handleSetFlavor(newValue.target.value, 0)}
              autoWidth
              label="1/2"
            >
              {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                <MenuItem key={key} value={key}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>1/2</InputLabel>
            <Select
              id={"pizza-select" + 1}
              value={flavorTwo}
              onChange={(newValue) => handleSetFlavor(newValue.target.value, 1)}
              autoWidth
              label="1/2"
            >
              {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                <MenuItem key={key} value={key}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <ProductForCart key={product.id} product={product} />
      </Card>
    </div>
  );
}

export default Pizza;
