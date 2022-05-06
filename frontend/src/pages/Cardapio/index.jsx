import React, { useState, useEffect } from "react";
import Produto from "../../components/Produto";
import * as DrinkService from "../../services/drink";
import * as PizzaService from "../../services/pizza";
import "./style.css";

export default function Cardapio() {
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await DrinkService.getAllDrinks();
      setDrinksList(drinks);
    };

    const fetchPizzas = async () => {
      const pizzas = await PizzaService.getAllPizzas();
      setPizzaList(pizzas);
    };

    fetchDrinks();
    fetchPizzas();
  }, []);

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      <div>
        {drinksList.map((drink) => (
          <Produto key={drink.id} product={drink} />
        ))}
      </div>

      <div>
        {pizzaList.map((pizza) => (
          <Produto key={pizza.id} product={pizza} />
        ))}
      </div>
    </section>
  );
}
