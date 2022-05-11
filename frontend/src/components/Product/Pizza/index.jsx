import { Card, TextField } from "@mui/material";
import ProductDescription from "../components/Description";

import "./style.css";

function Pizza({ product }) {
  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription key={product.id} product={product} />

        <div className="flavors-pizza">
          <TextField
            value={product.Flavor[0].Name}
            autoWidth
            label={product.Flavor.length === 2 ? "1/2":"Sabor"}
            disabled
          />

          
          {product.Flavor.length === 2
            && <TextField
              value={product.Flavor[1].Name}
              autoWidth
              label="1/2"
              disabled
            />
          }
        </div>
      </Card>
    </div>
  );
}

export default Pizza;
