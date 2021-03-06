import { useState } from 'react';
import Card from "@mui/material/Card";
import Pizza from "../../components/Product/Pizza";
import Drink from "../../components/Product/Drink";
import Combo from "../../components/Product/Combo";
import { Drink as DrinkModel, Pizza as PizzaModel, Combo as ComboModel } from '../../models/products';
import ProductForCart from "./components/ForCart";
import "./style.css";

function Product({ product, isCart, updateCartItems }) {
  const [productState, setProductState] = useState(product);

  const setProperties = (propertiesToUpdate) => {
    setProductState({
      ...productState,
      ...propertiesToUpdate
    });
  }
  
  return (
    <div className="product-card">
      <Card>
        {product instanceof PizzaModel
          ? <Pizza product={productState} isCart={isCart} setProperties={setProperties} />
          : product instanceof DrinkModel
            ? <Drink product={product} />
            : product instanceof ComboModel && <Combo product={product} />
        }

        <ProductForCart updateCartItems={updateCartItems} isCart={isCart} product={productState} />
      </Card>
    </div>
  );
}

export default Product;
