const wait = (seconds = 1500) =>
  new Promise((resolve) => setTimeout(() => resolve(null), seconds));

export default wait;
