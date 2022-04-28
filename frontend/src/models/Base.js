export default class Base {
  id;

  serialize (obj) {
    Object.entries(obj)
      .forEach(([key, value]) => {
        this[key] = value;
      });
  }
}
