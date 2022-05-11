import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ShoppingCartCheckout, Delete } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";
import * as PizzaService from "../../services/pizza";
import * as UserService from "../../services/user";
import { address as getAddress } from "../../services/user";
import { Pizza, Drink, Combo } from "../../models/products";
import "./style.css";

function concatStr(str, parameter, separator) {
  return str + parameter + separator;
}

function removeLastElement(str) {
  return str.substring(0, str.length - 1);
}

export default function Carrinho() {
  const [products, setProducts] = useState([]);
  const [orderValue, setOrderValue] = useState(0);
  const [observations, setObservations] = useState("");

  const [address, setAddress] = useState("");

  const updateProductsWithStorage = () => {
    const productsStorage = JSON.parse(localStorage.getItem("cart")) || [];

    const productsModels = [];

    productsStorage.forEach((prod) => {
      if (prod.Type === "Pizza") productsModels.push(new Pizza(prod));
      else if (prod.Type === "Drink") productsModels.push(new Drink(prod));
      else productsModels.push(new Combo(prod));
    });

    setProducts(productsModels);
  };

  async function handleRegisterOrder() {
    let Pizzas = "";
    let Drinks = "";
    let Combos = "";
    const requests = [];

    products.forEach((product) => {
      let flavorsIds = "";
      if (product instanceof Pizza) {
        flavorsIds = concatStr(flavorsIds, product.Flavor1, ",");
        if (product.Flavor2)
          flavorsIds = concatStr(flavorsIds, product.Flavor2, ",");

        const flavorsIDS = removeLastElement(flavorsIds);

        requests.push(
          PizzaService.registerPizza({
            Flavor: flavorsIDS,
            Name: product.Name,
            Size: product.Size,
            Price: product.Price,
            Url: product.Url,
          })
        );
      } else if (product instanceof Drink) {
        Drinks = concatStr(Drinks, product.id, ",");
      } else {
        Combos = concatStr(Combos, product.id, ",");
      }
    });

    Promise.all(requests).then((response) => {
      response.forEach((pizzas) => {
        Pizzas = concatStr(Pizzas, pizzas.data[0].id, ",");
      });
      Pizzas = removeLastElement(Pizzas);
      Drinks = removeLastElement(Drinks);
      Combos = removeLastElement(Combos);

      UserService.registerOrder({
        Status: "Recebido",
        Pizzas: Pizzas,
        Drinks: Drinks,
        Combos: Combos,
        Observation: observations,
        Total: orderValue,
      });

      localStorage.removeItem("cart");
      setProducts([]);
      setObservations("");

      alert("Pedido realizado");
    });
  }

  useEffect(() => {
    const fetchAddress = async () => {
      const {
        data: { Address },
      } = await getAddress();

      setAddress(Address);
    };

    updateProductsWithStorage();

    fetchAddress();
  }, []);

  useEffect(() => {
    setOrderValue(products.reduce((acc, product) => acc + product.Price, 0));
  }, [products]);

  return (
    <section className="main-cart">
      <h1 className="cart-title">Carrinho</h1>

      <div className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            isCart
            updateCartItems={updateProductsWithStorage}
          />
        ))}
      </div>

      <div className="delivery">
        <h2>
          Você receberá em: <u>{address}</u>
        </h2>

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
                startAdornment: <InputAdornment position="start" />,
              }}
              variant="standard"
            />

            <Button
              variant="contained"
              startIcon={<ShoppingCartCheckout />}
              onClick={handleRegisterOrder}
            >
              Realizar Pedido
            </Button>

            <Button
              variant="contained"
              startIcon={<Delete />}
              style={{ backgroundColor: "red" }}
              onClick={() => {
                window.localStorage.removeItem("cart");
                updateProductsWithStorage();
              }}
            >
              Limpar carrinho
            </Button>
          </Box>
        </div>
      </div>
    </section>
  );
}
