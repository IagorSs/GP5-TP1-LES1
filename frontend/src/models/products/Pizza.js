import Product from "./Product";

export default class Pizza extends Product {
  Size;

  Flavor1;
  Flavor2;

  qtdeFlavors;
  
  constructor(obj) {
    super();
    this.serialize(obj);
  }
}
