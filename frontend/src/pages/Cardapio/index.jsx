import React, { useState, useEffect } from "react";
import Produto from "../../components/Produto";
import { getDrinks } from "../../services/drink";
import * as PizzaService from "../../services/pizza";
import "./style.css";

export default function Cardapio() {
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await getDrinks();

      // drinks.data.link =
      //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjzNQc_qrUdagrBW-B4xLe5rO_qysb9YSJ-itsDnqM6LiJ1vy0VfwDdj5&s=10";

      setDrinksList(drinks);
    };

    const fetchPizzas = async () => {
      const pizzas = await PizzaService.getAll();

      setPizzaList(pizzas);
    };

    fetchDrinks();
    fetchPizzas();
  }, []);

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      <div className="list-products-cardapio">
        {drinksList.map((drink) => (
          <Produto key={drink.id} product={drink} />
        ))}
      </div>

      <div className="list-products-cardapio">
        {pizzaList.map((pizza) => (
          <Produto key={pizza.id} product={pizza} />
        ))}
      </div>
    </section>
  );
}
