import { Card, Select, MenuItem } from "@mui/material";
import ProductDescription from "../components/Description";
import { getAllFlavors } from "../../../services/flavor";

import "./style.css";
import { useEffect, useState } from "react";

function Pizza({ product, isCart, setProperties }) {
  const [allFlavors, setAllFlavors] = useState([]);

  product.Type = "Pizza";

  useEffect(() => {
    const fetchFlavors = async () => {
      const { data } = await getAllFlavors();

      setAllFlavors(data);
    }

    fetchFlavors();
  }, []);

  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription product={product} isCart={isCart} setProperties={setProperties} />

        <div className="flavors-pizza">
          <Select
            label={product.qtdeFlavors === 2 ? "1/2" : "Sabor"}
            disabled={isCart}
            value={product.Flavor1}
            onChange={({ target: { value }}) => setProperties({ Flavor1: value })}
          >
            {allFlavors.map(flavor => (
              <MenuItem key={flavor.id} value={flavor.id}>{flavor.Name}</MenuItem>
            ))}
          </Select>

          {product.qtdeFlavors === 2 && (
            <Select
              label="1/2"
              disabled={isCart}
              value={product.Flavor2}
              onChange={({ target: { value }}) => setProperties({ Flavor2: value })}
            >
              {allFlavors.map(flavor => (
                <MenuItem key={flavor.id} value={flavor.id}>{flavor.Name}</MenuItem>
              ))}
            </Select>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Pizza;
