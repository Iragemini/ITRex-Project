const generateID = (idArray) => {
  let max = 0;
  max = Math.max(...idArray);
  return max + 1;
};

export default generateID;
