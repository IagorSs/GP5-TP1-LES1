import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";

function Produto(cardInfo) {
  return (
    <div className="main-card">
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={cardInfo.product.link}
          alt="Pizza"
        />
        <CardContent className="description_product">
          <Typography> Descrição do produto </Typography>
          <h3> R$ XX,XX </h3>
        </CardContent>
        <CardActions>
          {cardInfo.product.page === "Cardápio" ? (
            <IconButton
              className="cart_icon"
              onClick={() => {
                alert("clicou carrinho");
              }}
              style={{ color: "#fa3937" }}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              className="delete_icon"
              onClick={() => {
                alert("clicou deletar");
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

export default Produto;
