const getRandomNumber = () => {
  return Math.floor(Math.random() * 1000);
}

const generateAddress = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let address = 'N';

  for (let i = 1; i < 35; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    address += characters[randomIndex];
  }

  return address;
}

export { getRandomNumber, generateAddress }