import React, { useState, useEffect } from "react";
import Endereco from "../../components/Endereco";
import Produto from "../../components/Produto";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import { getDrinks } from "../../services/drink";
import * as PizzaService from "../../services/pizza";
import "./style.css";

export default function Carrinho() {
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      // TODO: mudar para o getCarrinho
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
    <section className="main-cart">
      <h1 className="cart-title">Carrinho</h1>

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
      <div className="delivery">
        <h3>Receber em:</h3>
        <div>
          <Endereco />
        </div>
        <div>
          <TextField
            id="value-read-only-input"
            label="Valor do pedido (R$)"
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            variant="standard"
          />

          <Button variant="contained" startIcon={<ShoppingCartCheckoutIcon />}>
            Realizar Pedido
          </Button>
        </div>
      </div>
    </section>
  );
}
