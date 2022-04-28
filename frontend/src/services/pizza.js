import { Pizza } from "../models/products";
import wait from "../tmp/wait";

export const getAll = async () => {
  // TODO

  await wait(1500);

  return [new Pizza()];
};
