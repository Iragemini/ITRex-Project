const generateID = (idArray) => {
  let max = 0;

  console.log('map', idArray);
  max = Math.max(...idArray);
  return max + 1;
};

export default generateID;
