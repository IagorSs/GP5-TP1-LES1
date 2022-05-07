import Card from "@mui/material/Card";
import ProductDescription from "../components/Description";
import ProductForCart from "../components/ForCart";
import "./style.css";

function Drink({ product }) {
  return (
    <div className="pizza-card">
      <Card>
        <ProductDescription key={product.id} product={product} />

        {/* <ProductForCart key={product.id} product={product} /> */}
      </Card>
    </div>
  );
}

export default Drink;
