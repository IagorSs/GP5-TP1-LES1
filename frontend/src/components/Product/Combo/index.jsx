import { useState } from "react";
import Card from "@mui/material/Card";
import ProductDescription from "../components/Description";

import Pizza from "../Pizza";
import Drink from "../Drink";

import "./style.css";

function Combo({ product }) {
  const [pizzas] = useState(product.Pizzas);
  const [drinks] = useState(product.Drinks);

  return (
    <div className="combo-card">
      <Card>
        <ProductDescription key={product.id} product={product} />
        <div className="pizzas">
          {pizzas.map(
            (pizza) => (
              (pizza.Father = "Combo"),
              (<Pizza key={pizza.id} product={pizza} />)
            )
          )}
        </div>
        <div className="drinks">
          {drinks.map(
            (drink) => (
              (drink.Father = "Combo"),
              (<Drink key={drink.id} product={drink} />)
            )
          )}
        </div>
      </Card>
    </div>
  );
}

export default Combo;
