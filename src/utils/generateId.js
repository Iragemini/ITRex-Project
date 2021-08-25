const generateID = (arrayOfID) => {
  let max = 0;
  max = Math.max(...arrayOfID);
  return max + 1;
};

export default generateID;
