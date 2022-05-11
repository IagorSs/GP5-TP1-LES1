import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";
import * as PizzaService from "../../services/pizza";
import * as DrinkService from "../../services/drink";
import { address as getAddress } from '../../services/user';
import { Pizza, Drink, Combo } from '../../models/products';
import "./style.css";

export default function Carrinho() {
  const [products, setProducts] = useState([]);
  const [orderValue, setOrderValue] = useState(0);
  const [observations, setObservations] = useState("");

  const [address, setAddress] = useState("");

  const updateProductsWithStorage = () => {
    const productsStorage = JSON.parse(localStorage.getItem("cart")) || [];

    const productsModels = [];

    productsStorage.forEach((prod) => {
      if (prod.Type === 'Pizza') productsModels.push(new Pizza(prod));
      else if (prod.Type === 'Drink') productsModels.push(new Drink(prod));
      else productsModels.push(new Combo(prod));
    });

    setProducts(productsModels);
  }

  async function handleRegisterOrder() {
    const requests = [];

    products.forEach((product) => {
      let flavorsIds = "";

      if (product instanceof Pizza) {
        product.Flavor.map(
          (flavor) => (flavorsIds = flavorsIds + flavor.id + ",")
        );
        const flavorsIDS = flavorsIds.substring(0, flavorsIds.length - 1);

        requests.push(PizzaService.registerPizza({
          Flavor: flavorsIDS,
          Name: product.Name,
          Price: product.Price,
          Size: product.Size,
          Url: product.Url,
          Description: product.Description,
        }));
      } else if (product instanceof Drink) {
        requests.push(DrinkService.registerDrink({
          Name: product.Name,
          Price: product.Price,
          Size: product.Size,
          Url: product.Url,
          Description: product.Description,
        }));
      }
    });

    // TODO implementar resposta pra usuário
    Promise.all(requests)
      .then(() => {
        localStorage.removeItem("cart");
        setProducts([]);

        alert("Pedido realizado");
      })
  }
  
  useEffect(() => {
    const fetchAddress = async () => {
      const { data: { Address } } = await getAddress();

      setAddress(Address);
    }

    updateProductsWithStorage();

    fetchAddress();
  }, []);

  useEffect(() => {
    setOrderValue(products.reduce((acc, product) => acc + product.Price, 0));
  }, [products]);

  return (
    <section className="main-cart">
      <h1 className="cart-title">Carrinho</h1>

      <div>
        {products.map((product) => (
          <Product key={product.id} product={product} isCart updateCartItems={updateProductsWithStorage} />
        ))}
      </div>

      <div className="delivery">
        <h2>Você receberá em: <u>{address}</u></h2>

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
                  <InputAdornment position="start" />
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
