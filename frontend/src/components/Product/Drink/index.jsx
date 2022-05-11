import Card from "@mui/material/Card";
import ProductDescription from "../components/Description";
import "./style.css";

function Drink({ product }) {
  product.Type = "Drink";
  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription key={product.id} product={product} />
      </Card>
    </div>
  );
}

export default Drink;
