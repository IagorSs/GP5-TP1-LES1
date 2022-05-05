export default class Base {
  id;

  updatedAt;

  createdAt;

  serialize(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
