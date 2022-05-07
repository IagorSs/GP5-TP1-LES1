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
          <a href="/" className="company-title">
            Pizzaria Pizzada
          </a>
        </Box>

        <Box className="menu" sx={{ "& > :not(style)": { m: 3 } }}>
          <a className="link" href="/menu">
            {<RestaurantMenuIcon />}
          </a>

          <a className="link" href="/cart">
            {<ShoppingCartIcon />}
          </a>

          <a className="link" href="/user">
            {<PersonIcon />}
          </a>
        </Box>
      </section>
    </header>
  );
}

export default Header;
