import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import ProductDescription from "../components/Description";

import Pizza from "../Pizza";
import Drink from "../Drink";
// import ProductForCart from "../components/ForCart";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import * as PizzaFlavorService from "../../../services/flavor";

import "./style.css";

function Combo({ product }) {
  const [pizzas, setPizzas] = useState(product.Pizzas);
  const [drinks, setDrinks] = useState(product.Drinks);

  // console.log(pizzas);
  // useEffect(() => {
  //   const fetchPizzas = async () => {
  //     const pizzas = await PizzaFlavorService.getAllFlavors();
  //     setFlavorsPizza(flavors);
  //   };

  //   fetchFlavors();
  // }, []);

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
