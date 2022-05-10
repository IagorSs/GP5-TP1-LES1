import React, { useState, useEffect } from "react";
import Address from "../../components/Address";
// import Pizza from "../../components/Product/Pizza";
// import Drink from "../../components/Product/Drink";
// import Combo from "../../components/Product/Combo";
import Product from "../../components/Product";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";
import "./style.css";

export default function Carrinho() {
  const [products, setProducts] = useState([]);
  const [orderValue, setOrderValue] = useState(0);
  const [observations, setObservations] = useState("");

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

      {/* <div>
        {products.map((product) =>
          // FIXME: os produtos estao instaciados de maneira incorreta no carrinho
          product instanceof Pizza ? (
            <Pizza key={product.id} product={product} />
          ) : product instanceof Drink ? (
            <Drink key={product.id} product={product} />
          ) : (
            <Combo key={product.id} product={product} />
          )
        )}
      </div> */}

      <div>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className="delivery">
        <h3>Receber em:</h3>
        <div>
          <Address />
        </div>
        <div className="order-results">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="order-observation"
              label="Observações"
              variant="standard"
              value={observations}
              onChange={(newValue) => {
                setObservations(newValue.target.value);
              }}
            />

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

            <Button
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon />}
            >
              Realizar Pedido
            </Button>
          </Box>
        </div>
      </div>
    </section>
  );
}
