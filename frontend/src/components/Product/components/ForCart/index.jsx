import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

import { convertToMoney } from "../../../../utils/string";
import "./style.css";

function ProductForCart({ product, isCart, updateCartItems }) {
  const handleAddProduct = async () => {
    const products = JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    products.push(product);
    localStorage.setItem("cart", JSON.stringify(products));

    if (updateCartItems) updateCartItems();
  };

  const handleRemoveProduct = async () => {
    const products = JSON.parse(localStorage.getItem("cart"));

    const indexProduct = products.findIndex((item) => item.id === product.id);

    products.splice(indexProduct, 1);
    localStorage.setItem("cart", JSON.stringify(products));

    if (updateCartItems) updateCartItems();
  };

  return (
    <Card>
      <CardContent className="card-for-cart">
        <h3>
          {convertToMoney(product.Price)}
        </h3>
      </CardContent>
      <CardActions>
        {!isCart ? (
          <IconButton
            className="cart_icon"
            onClick={() => {
              handleAddProduct();
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
  );
}

export default ProductForCart;
