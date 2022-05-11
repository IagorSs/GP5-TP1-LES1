import Product from "./Product";

export default class Pizza extends Product {
  Size;
  
  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
