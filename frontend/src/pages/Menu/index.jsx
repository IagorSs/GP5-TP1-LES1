import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import * as DrinkService from "../../services/drink";
import * as ComboService from "../../services/combo";
import "./style.css";
import { Pizza } from "../../models/products";

const SIZES_PRICES = {
  Pequena: 30,
  Media: 40,
  Grande: 50
}

export default function Cardapio() {
  const [drinksList, setDrinksList] = useState([]);
  const [comboList, setComboList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await DrinkService.getAllDrinks();
      setDrinksList(drinks);
    };

    const fetchCombos = async () => {
      const combos = await ComboService.getAllCombos();
      setComboList(combos);
    };

    fetchDrinks();
    fetchCombos();
  }, []);

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      <section className="pizzas">
        <h2 className="pizzas-menu-title">Pizzas</h2>

        <Product product={new Pizza({
          Name: "Pizza Simples",
          Url: "https://cdn.discordapp.com/attachments/968666819206447204/974056571950743562/unknown.png",
          Size: "Pequena",
          Price: SIZES_PRICES.Pequena,
          qtdeFlavors: 1
        })}/>

        <Product product={new Pizza({
          Name: "Pizza Mista",
          Url: "https://instadelivery-public.nyc3.digitaloceanspaces.com/itens/wEgPsfNvkU9ThK4WFzK4tGMUAlHFbAdXY93LC1yY.png",
          Size: "Pequena",
          Price: SIZES_PRICES.Pequena,
          qtdeFlavors: 2
        })}/>
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
