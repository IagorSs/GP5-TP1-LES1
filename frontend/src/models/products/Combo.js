import Product from "./Product";

export default class Combo extends Product {
  Drinks;

  Pizzas;

  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
