const getRandomKey = obj => {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
};

export default getRandomKey;
