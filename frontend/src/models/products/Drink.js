import Product from "./Product";

export default class Drink extends Product {
  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
