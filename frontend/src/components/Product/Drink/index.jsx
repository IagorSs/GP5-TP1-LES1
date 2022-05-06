import Card from "@mui/material/Card";
import ProductDescription from "../Description";
import ProductForCart from "../ForCart";
import "./style.css";

function Drink({ product }) {
  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription key={product.id} product={product} />

        <ProductForCart key={product.id} product={product} />
      </Card>
    </div>
  );
}

export default Drink;
