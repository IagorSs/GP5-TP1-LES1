import Card from "@mui/material/Card";
import Pizza from "../../components/Product/Pizza";
import Drink from "../../components/Product/Drink";
import Combo from "../../components/Product/Combo";
import { Drink as DrinkModel, Pizza as PizzaModel, Combo as ComboModel } from '../../models/products';
import ProductForCart from "./components/ForCart";
import "./style.css";

function Product({ product }) {
  return (
    <div className="product-card">
      <Card>
        {product instanceof PizzaModel
          ? <Pizza key={product.id} product={product} />
          : product instanceof DrinkModel
            ? <Drink key={product.id} product={product} />
            : product instanceof ComboModel && <Combo key={product.id} product={product} />
        }

        <ProductForCart key={product.id} product={product} />
      </Card>
    </div>
  );
}

export default Product;
