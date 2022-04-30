import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";

function CardPizza(cardInfo) {
  return (
    <div className="main-card">
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={cardInfo.pizza.link}
          alt="Pizza"
        />
        <CardContent className="description_pizza">
          <Typography> Descrição da pizza </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className="cart_icon"
            onClick={() => {
              alert("clicou carrinho");
            }}
            style={{ color: "#fa3937" }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardPizza;
