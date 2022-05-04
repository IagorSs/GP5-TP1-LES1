import React from "react";
import Endereco from "../../components/Endereco";
import Produto from "../../components/Produto";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InputAdornment from "@mui/material/InputAdornment";
import "./style.css";

export default function Carrinho() {
  let quantProductCards = 3;
  let productInfo = [];

  async function handleGetProductDetail() {
    let data;

    for (var i = 0; i < quantProductCards; i++) {
      // data = await getMovieDetail(moviesListOfGenre.at(initial).id);
      data = {
        link: "https://claudia.abril.com.br/wp-content/uploads/2020/07/pizza-pepperoni.jpg",
        page: "Carrinho",
      };
      productInfo.push(data);
    }
  }

  handleGetProductDetail();

  return (
    <section className="main-cart">
      <h1 className="cart-title">Carrinho</h1>

      {productInfo.length > 0 && (
        <div className="list-products-carrinho">
          {productInfo.map((product) => (
            <Produto product={product} />
          ))}
        </div>
      )}
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
