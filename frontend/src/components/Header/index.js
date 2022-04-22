import React from "react";
import Link from '@mui/material/Link';
import './style.css';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

function Header() {
    return (
        <header >
            <section className="main-header">
                
                <div className ="name">
                    <Link href="http://localhost:3000/" underline="button" className ="header-icon-logo" color="#FFFFFF" >
                            {<LocalPizzaIcon sx={{ fontSize: 45 }}/>}
                    </Link>
                    Pizzaria da pizza pizzada 
                </div>

                <div className="icons"> 
                    <div className ="header-menu-logo">
                        <Link href="http://localhost:3000/" underline="button"  color="#FFFFFF" >
                                {<RestaurantMenuIcon sx={{ fontSize: 35 }}/>}
                        </Link>
                    </div>

                    <div className ="header-user-logo">
                        <Link href="http://localhost:3000/" underline="button"  color="#FFFFFF" >
                                {<PersonOutlineIcon sx={{ fontSize: 35 }}/>}
                        </Link> 

                    </div>
                </div>
                
            </section>
        </header>
        
    );
}

export default Header;