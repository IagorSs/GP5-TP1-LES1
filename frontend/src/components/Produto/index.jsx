import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.css";

function Produto(cardInfo) {
  const [size, setSize] = React.useState("");

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

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
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="size-select">Tamanho</InputLabel>
            {cardInfo.product.type === "Pizza" ? (
              <Select
                id="size-select"
                value={size}
                onChange={handleChangeSize}
                autoWidth
                label="Tamanho"
              >
                <MenuItem value={"P"}>P - 4 Fatias</MenuItem>
                <MenuItem value={"M"}>M - 6 Fatias</MenuItem>
                <MenuItem value={"G"}>G - 8 Fatias</MenuItem>
                <MenuItem value={"GG"}>GG - 10 Fatias</MenuItem>
              </Select>
            ) : (
              <Select
                id="size-select"
                value={size}
                onChange={handleChangeSize}
                autoWidth
                label="Tamanho"
              >
                <MenuItem value={"1L"}>1L</MenuItem>
                <MenuItem value={"2L"}>2L</MenuItem>
                <MenuItem value={"3L"}>3L</MenuItem>
              </Select>
            )}
          </FormControl>

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
