import { useState } from "react";
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
import { Pizza } from "../../models/products";
import { convertToMoney } from "../../utils/string";
import "./style.css";

// TODO buscar isso do backend
const SIZES_PIZZA = {
  P: "4 Fatias",
  M: "6 Fatias",
  G: "8 Fatias",
  GG: "10 Fatias",
};

const SIZES_DRINK = {
  1: "1L",
  2: "2L",
  3: "3L",
};

const FLAVORS_PIZZA = {
  ID1: "Mussarela",
  ID2: "Calabresa",
  ID3: "Peperoni",
  ID4: "Portuguesa",
};

let productInsertCart = [];

function Produto({ product }) {
  const [size, setSize] = useState("");
  const [flavorOne, setFlavorOne] = useState("");
  const [flavorTwo, setFlavorTwo] = useState("");

  const handleSetProduct = async () => {
    productInsertCart.push(product);
    // console.log(productInsertCart);
    localStorage.setItem("cart", JSON.stringify(productInsertCart));
  };

  const handleRemoveProduct = async () => {
    let productsStorage = JSON.parse(localStorage.getItem("cart"));
    let index = productsStorage.findIndex((item) => item.id === product.id);
    productsStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productsStorage));
    window.location.reload();
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  async function handleSetFlavor(newValue, flavor) {
    if (flavor === 0) {
      setFlavorOne(newValue);
    } else {
      setFlavorTwo(newValue);
    }
  }

  return (
    <div className="main-card">
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={product.Url}
          // alt="Pizza"
        />
        <CardContent className="description_product">
          <h2>{product.Name}</h2>
          <Typography>{product.Description}</Typography>

          {/* {Object.entries(LABELS).map(([value]) => (
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel>1/2</InputLabel>
              <Select
                id={"pizza-select" + value}
                value={value === 0 ? flavorOne : flavorTwo}
                onChange={(newValue) =>
                  handleSetFlavor(newValue.target.value, value)
                }
                autoWidth
                label="1/2"
              >
                {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                  <MenuItem key={key} value={key}>
                    {description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))} */}

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>1/2</InputLabel>
            <Select
              id={"pizza-select" + 0}
              value={flavorOne}
              onChange={(newValue) => handleSetFlavor(newValue.target.value, 0)}
              autoWidth
              label="1/2"
            >
              {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                <MenuItem key={key} value={key}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>1/2</InputLabel>
            <Select
              id={"pizza-select" + 1}
              value={flavorTwo}
              onChange={(newValue) => handleSetFlavor(newValue.target.value, 1)}
              autoWidth
              label="1/2"
            >
              {Object.entries(FLAVORS_PIZZA).map(([key, description]) => (
                <MenuItem key={key} value={key}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="size-select">Tamanho</InputLabel>

            <Select
              id="size-select"
              value={size}
              onChange={handleChangeSize}
              autoWidth
              label="Tamanho"
            >
              {Object.entries(
                // FIXME: os produtos estao instaciados de maneira incorreta no carrinho
                product instanceof Pizza ? SIZES_PIZZA : SIZES_DRINK
              ).map(([value, description]) => (
                <MenuItem key={value} value={value}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <h3>{convertToMoney(product.Price)}</h3>
        </CardContent>
        <CardActions>
          {window.location.pathname === "/cardapio" ? (
            <IconButton
              className="cart_icon"
              onClick={() => {
                handleSetProduct();
              }}
              style={{ color: "#fa3937" }}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              className="delete_icon"
              onClick={() => {
                handleRemoveProduct();
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
