import Base from "./Base";

export default class Flavor extends Base {
  constructor(obj) {
    super();
    this.serialize(obj);
  }
  Name;

  Description;
}
