import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

import { convertToMoney } from "../../../utils/string";
import "./style.css";

let productInsertCart = [];

function ProductForCart({ product }) {
  const handleSetProductInsertCart = async () => {
    productInsertCart = [];
    let productsStorage = JSON.parse(localStorage.getItem("cart"));
    productsStorage.forEach((item) => {
      productInsertCart.push(item);
    });
  };

  const handleSetProduct = async () => {
    console.log(product);
    productInsertCart.push(product);
    localStorage.setItem("cart", JSON.stringify(productInsertCart));
  };

  const handleRemoveProduct = async () => {
    let productsStorage = JSON.parse(localStorage.getItem("cart"));
    let index = productsStorage.findIndex((item) => item.id === product.id);
    productsStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productsStorage));
    window.location.reload();
  };

  useEffect(() => {
    handleSetProductInsertCart();
  });

  return (
    <div>
      <Card>
        <CardContent>
          <h3>{convertToMoney(product.Price)}</h3>
        </CardContent>
        <CardActions>
          {window.location.pathname === "/cardapio" ? (
            <IconButton
              className="cart_icon"
              onClick={() => {
                handleSetProduct();
              }}
              style={{ color: "#fa3937" }}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              className="delete_icon"
              onClick={() => {
                handleRemoveProduct();
              }}
              style={{ color: "#fa3937" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductForCart;
