import React, { useState, useEffect } from "react";
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

      <section className="pizzas">
        <h2 className="pizzas-menu-title">Pizzas</h2>
        {pizzaList.map((pizza) => (
          <Product key={pizza.id} product={pizza} />
        ))}
      </section>

      <section className="drinks">
        <h2 className="drinks-menu-title">Drinks</h2>
        {drinksList.map((drink) => (
          <Product key={drink.id} product={drink} />
        ))}
      </section>

      <section className="combos">
        <h2 className="combos-menu-title">Combos</h2>
        {comboList.map((combo) => (
          <Product key={combo.id} product={combo} />
        ))}
      </section>
    </section>
  );
}
