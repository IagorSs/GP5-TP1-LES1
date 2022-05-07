import React, { useState, useEffect } from "react";
import Endereco from "../../components/Endereco";
import Pizza from "../../components/Product/Pizza";
import Drink from "../../components/Product/Drink";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";
import "./style.css";

export default function Carrinho() {
  const [products, setProducts] = useState([]);
  const [orderValue, setOrderValue] = useState(0);

  async function handleSetValue() {
    let value = 0;
    products.forEach((product) => {
      value += product.Price;
    });
    setOrderValue(value);
  }
  useEffect(() => {
    const fetchProducts = async () => {
      let productsStorage = JSON.parse(localStorage.getItem("cart"));
      setProducts(productsStorage);
      handleSetValue();
    };

    fetchProducts();
  });

  return (
    <section className="main-cart">
      <h1 className="cart-title">Carrinho</h1>

      <div>
        {products.map((product) =>
          // FIXME: os produtos estao instaciados de maneira incorreta no carrinho
          product instanceof Pizza ? (
            // (
            //   <Pizza key={product.id} product={product} />
            // ) : (
            //   <Drink key={product.id} product={product} />
            // )
            <Drink key={product.id} product={product} />
          ) : (
            <Pizza key={product.id} product={product} />
          )
        )}
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
            value={convertToMoney(orderValue)}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
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
