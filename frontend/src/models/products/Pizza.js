import Product from "./Product";

export default class Pizza extends Product {
  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
