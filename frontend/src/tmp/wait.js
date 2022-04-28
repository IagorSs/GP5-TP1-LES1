const wait = (seconds = 1500) =>
  new Promise(setTimeout((res) => res(null), seconds));

export default wait;
