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
              style={{ margin: "10px" }}
              variant="square"
              sx={{ width: 315, height: 90 }}
              src="https://www.cefetmg.br/wp-content/uploads/2019/11/logo_topo.png"
            ></Avatar>
          </Link>
        </div>

        <span className="infos">
          Laboratório de Engenharia de Software I <br></br>
          Copyright © {date()}
        </span>

        <div className="authors">
          <Box
            className="authors_links"
            sx={{ "& > :not(style)": { m: 3 } }}
            fontSize={14}
          >
            <a
              className="link"
              href="https://www.linkedin.com/in/erickhenriquedds/"
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
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
                sx={{ width: 50, height: 50 }}
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
                sx={{ width: 50, height: 50 }}
                style={{ margin: "10px" }}
                src="https://github.com/IagorSs.png"
              />
              Vitor Laguardia
            </a>

            <a
              className="link"
              href="https://www.linkedin.com/in/vitor-laguardia-xavier-25200819b/"
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                style={{ margin: "10px" }}
                src="https://github.com/IagorSs.png"
              />
              Tarcisio Amaral
            </a>
          </Box>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
