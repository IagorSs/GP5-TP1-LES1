import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  return (
    <Card>
      <CardContent className="card-for-cart">
        <h3>
          {convertToMoney(product.Price)}
        </h3>
      </CardContent>
      <CardActions>
        {!isCart && (
          <IconButton
            className="cart_icon"
            onClick={() => {
              handleAddProduct();
            }}
            style={{ color: "#fa3937" }}
          >
            <ShoppingCartIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductForCart;
