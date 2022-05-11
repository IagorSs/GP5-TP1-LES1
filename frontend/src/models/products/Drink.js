import Product from "./Product";

export default class Drink extends Product {
  Size;

  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
