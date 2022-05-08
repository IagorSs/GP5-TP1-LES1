import React from "react";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Link from '../Link';

import "./style.css";

function Header() {
  return (
    <header>
      <section className="main-header">
        <Box className="name" sx={{ "& > :not(style)": { m: 3 } }}>
          <Link to="/" className="logo">
            {<LocalPizzaIcon sx={{ fontSize: 50 }} />}
          </Link>
          <Link to="/" className="company-title">
            Pizzaria Pizzada
          </Link>
        </Box>

        <Box className="menu" sx={{ "& > :not(style)": { m: 3 } }}>
          <Link className="link" to="/menu">
            {<RestaurantMenuIcon />}
          </Link>

          <Link className="link" to="/cart">
            {<ShoppingCartIcon />}
          </Link>

          <Link className="link" to="/user">
            {<PersonIcon />}
          </Link>
        </Box>
      </section>
    </header>
  );
}

export default Header;
