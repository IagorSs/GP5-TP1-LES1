import { Card, CardMedia, CardContent, Select, MenuItem, TextField } from "@mui/material";

import { Drink } from "../../../../models/products";

import "./style.css";

const SIZES_PRICES = {
  Pequena: 30,
  Media: 40,
  Grande: 50
}

function ProductDescription({ product, isCart, setProperties }) {
  return (
    <Card>
      <CardMedia component="img" height="250" image={product.Url} />

      <CardContent className="card-description">
        <h2>{product.Name}</h2>

        {(product instanceof Drink) && (
          <TextField
            value={product.Size}
            autoWidth
            label="Tamanho"
            disabled
            sx={{ m: 1, minWidth: 80, display: "flex" }}
          />
        )}

        {(product.Type === 'Pizza') && (
          <Select
            disabled={isCart}
            sx={{ m: 1, minWidth: 80, display: "flex" }}
            value={product.Size}
            onChange={({ target: { value }}) => setProperties({ Size: value, Price: SIZES_PRICES[value] })}
          >
            <MenuItem value="Pequena">Pequena</MenuItem>
            <MenuItem value="Media">Média</MenuItem>
            <MenuItem value="Grande">Grande</MenuItem>
          </Select>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductDescription;
