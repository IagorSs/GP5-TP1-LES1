import {
  Card,
  CardMedia,
  CardContent,
  TextField
} from "@mui/material";

import { Combo } from '../../../../models/products';

import "./style.css";

function ProductDescription({ product }) {
  return (
    <div>
      <Card>
        <CardMedia component="img" height="250" image={product.Url} />

        <CardContent>
          <h2>{product.Name}</h2>

          {
            !(product instanceof Combo) && 
            <TextField
              value={product.Size}
              autoWidth
              label="Tamanho"
              disabled
              sx={{ m: 1, minWidth: 80, display: 'flex' }}
            />
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDescription;
