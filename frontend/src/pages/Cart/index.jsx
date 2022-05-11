import React, { useState, useEffect } from "react";
// import Address from "../../components/Address";
import Product from "../../components/Product";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";
import * as PizzaService from "../../services/pizza";
import * as DrinkService from "../../services/drink";
import "./style.css";

export default function Carrinho() {
  const [products, setProducts] = useState([]);
  const [orderValue, setOrderValue] = useState(0);
  const [observations, setObservations] = useState("");

  async function handleRegisterOrder() {
    // let flavorsIds = "";

    // console.log("XX");
    // console.log(products);

    products.forEach((product) => {
      let flavorsIds = "";
      // adicionando os ids necessários
      if (product.Type === "Pizza") {
        product.Flavor.map(
          (flavor) => (flavorsIds = flavorsIds + flavor.id + ",")
        );
        const flavorsIDS = flavorsIds.substring(0, flavorsIds.length - 1);

        let newPizza = PizzaService.registerPizza({
          Flavor: flavorsIDS,
          Name: product.Name,
          Price: product.Price,
          Size: product.Size,
          Url: product.Url,
          Description: product.Description,
        });
      } else if (product.Type === "Drink") {
        let newDrink = DrinkService.registerDrink({
          Name: product.Name,
          Price: product.Price,
          Size: product.Size,
          Url: product.Url,
          Description: product.Description,
        });
      }
    });
  }

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
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className="delivery">
        {/* <h3>Receber em:</h3> */}
        {/* <div>
          <Address />
        </div> */}
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
              onClick={handleRegisterOrder}
            >
              Realizar Pedido
            </Button>
          </Box>
        </div>
      </div>
    </section>
  );
}
