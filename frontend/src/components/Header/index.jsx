import React from "react";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";

import "./style.css";

function Header() {
  return (
    <header>
      <section className="main-header">
        <Box className="name" sx={{ "& > :not(style)": { m: 3 } }}>
          <a href="/" className="logo">
            {<LocalPizzaIcon sx={{ fontSize: 50 }} />}
          </a>
          Pizzaria Pizzada
        </Box>

        <Box className="menu" sx={{ "& > :not(style)": { m: 3 } }}>
          <a className="link" href="http://localhost:3000/cardapio">
            {
              <RestaurantMenuIcon
                onClick={() => {
                  alert("clicou cardapio");
                }}
              />
            }
          </a>

          <a className="link" href="http://localhost:3000/carrinho">
            {
              <ShoppingCartIcon
                onClick={() => {
                  alert("clicou carrinho");
                }}
              />
            }
          </a>

          <a className="link" href="http://localhost:3000/user">
            {
              <PersonIcon
                onClick={() => {
                  alert("clicou usuario");
                }}
              />
            }
          </a>
        </Box>
      </section>
    </header>
  );
}

export default Header;
