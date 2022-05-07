import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import ProductDescription from "../Description";
import ProductForCart from "../ForCart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as PizzaFlavorService from "../../../services/flavor";

import "./style.css";

function Pizza({ product }) {
  console.log(product);
  const [flavorsPizza, setFlavorsPizza] = useState([]);
  const [flavorOne, setFlavorOne] = useState(product.Flavor[0].Name);
  const [flavorTwo, setFlavorTwo] = useState(product.Flavor[1].Name);

  async function handleSetFlavor(newValue, flavor) {
    let index = flavorsPizza.findIndex((item) => item.Name === newValue);
    let newFlavor = flavorsPizza[index];

    if (flavor === 0) {
      product.Flavor[0] = newFlavor;
      setFlavorOne(newFlavor.Name);
    } else {
      product.Flavor[1] = newFlavor;
      setFlavorTwo(newFlavor.Name);
    }
  }

  useEffect(() => {
    const fetchFlavors = async () => {
      const flavors = await PizzaFlavorService.getAllFlavors();
      setFlavorsPizza(flavors);
    };

    fetchFlavors();
  }, []);

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
              {flavorsPizza.map((flavor) => (
                <MenuItem value={flavor.Name}>{flavor.Name}</MenuItem>
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
              {flavorsPizza.map((flavor) => (
                <MenuItem value={flavor.Name}>{flavor.Name}</MenuItem>
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
