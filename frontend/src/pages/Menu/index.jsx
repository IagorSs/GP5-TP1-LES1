import React, { useState, useEffect } from "react";
// import Pizza from "../../components/Product/Pizza";
// import Drink from "../../components/Product/Drink";
// import Combo from "../../components/Product/Combo";
import Product from "../../components/Product";
import * as DrinkService from "../../services/drink";
import * as PizzaService from "../../services/pizza";
import * as ComboService from "../../services/combo";
import "./style.css";

export default function Cardapio() {
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);
  const [comboList, setComboList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await DrinkService.getAllDrinks();
      setDrinksList(drinks);
    };

    const fetchPizzas = async () => {
      const pizzas = await PizzaService.getAllPizzas();
      setPizzaList(pizzas);
    };

    const fetchCombos = async () => {
      const combos = await ComboService.getAllCombos();
      setComboList(combos);
    };

    fetchDrinks();
    fetchPizzas();
    fetchCombos();
  }, []);

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      {/* <div>
        {pizzaList.map((pizza) => (
          <Pizza key={pizza.id} product={pizza} />
        ))}
      </div>

      <div>
        {drinksList.map((drink) => (
          <Drink key={drink.id} product={drink} />
        ))}
      </div> */}

      {/* <div>
        {comboList.map((combo) => (
          <Combo key={combo.id} product={combo} />
        ))}
      </div> */}

      <div>
        <h2 className="pizzas-title">Pizzas</h2>
        {pizzaList.map(
          (pizza) => (
            (pizza.Type = "Pizza"), (<Product key={pizza.id} product={pizza} />)
          )
        )}
      </div>

      <div>
        <h2 className="drinks-title">Drinks</h2>
        {drinksList.map(
          (drink) => (
            (drink.Type = "Drink"), (<Product key={drink.id} product={drink} />)
          )
        )}
      </div>

      <div>
        <h2 className="combos-title">Combos</h2>
        {comboList.map(
          (combo) => (
            (combo.Type = "Combo"), (<Product key={combo.id} product={combo} />)
          )
        )}
      </div>
    </section>
  );
}
