import React from "react";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import "./style.css";

function date() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <footer>
      <section className="main-footer">
        <div className="cefet_logo">
          <Link href="https://www.cefetmg.br/">
            <Avatar
              variant="square"
              sx={{ width: 315, height: 90 }}
              src="https://www.cefetmg.br/wp-content/uploads/2019/11/logo_topo.png"
            ></Avatar>
          </Link>
        </div>

        <div className="authors">
          <Box
            className="authors_links"
            sx={{ "& > :not(style)": { m: 2 } }}
            fontSize={14}
          >
            <a
              className="link"
              href="https://www.linkedin.com/in/erickhenriquedds/"
            >
              <Avatar
                style={{ margin: "10px" }}
                src="https://github.com/ErickHDdS.png"
              />
              Erick Henrique
            </a>

            <a
              className="link"
              href="https://www.linkedin.com/in/iagor-s-486635138/"
            >
              <Avatar
                style={{ margin: "10px" }}
                src="https://github.com/IagorSs.png"
              />
              Iagor Souza
            </a>

            <a
              className="link"
              href="https://www.linkedin.com/in/vitor-laguardia-xavier-25200819b/"
            >
              <Avatar
                style={{ margin: "10px" }}
                src="https://github.com/vitor-laguardia.png"
              />
              Vitor Laguardia
            </a>

            <a className="link" href="https://www.linkedin.com/in/t4rcisio/">
              <Avatar
                style={{ margin: "10px" }}
                src="https://github.com/t4rcisio.png"
              />
              Tarcisio Amaral
            </a>
          </Box>
        </div>

        <span className="infos">
          Laboratório de Engenharia de Software I <br></br>
          Copyright © {date()}
        </span>
      </section>
    </footer>
  );
}

export default Footer;
