const findItem = (data, find) => {
  for (let key in data) {
    if (data[key].includes(find)) {
      return data[key][1];
    }
  }
};

export default findItem;
