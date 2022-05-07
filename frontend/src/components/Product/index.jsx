import Card from "@mui/material/Card";
import Pizza from "../../components/Product/Pizza";
import Drink from "../../components/Product/Drink";
import Combo from "../../components/Product/Combo";
import ProductForCart from "./components/ForCart";
import "./style.css";

function Product({ product }) {
  return (
    <div className="product-card">
      <Card>
        {/* {product instanceof Pizza ? (
          // (
          //   <Pizza key={product.id} product={product} />
          // ) : (
          //   <Drink key={product.id} product={product} />
          // )
          <Pizza key={product.id} product={product} />
        ) : // <Drink key={product.id} product={product} />
        product instanceof Drink ? (
          <Drink key={product.id} product={product} />
        ) : (
          // <Pizza key={product.id} product={product} />
          <Combo key={product.id} product={product} />
        )} */}
        {product.Type === "Pizza" ? (
          <Pizza key={product.id} product={product} />
        ) : product.Type === "Drink" ? (
          <Drink key={product.id} product={product} />
        ) : (
          <Combo key={product.id} product={product} />
        )}

        <ProductForCart key={product.id} product={product} />
      </Card>
    </div>
  );
}

export default Product;
