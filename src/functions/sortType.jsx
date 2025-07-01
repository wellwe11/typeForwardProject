const sortType = (type, setter, includes) => {
  const sorted = {};

  type.forEach((i) => {
    if (i.url.toLowerCase().includes(includes)) {
      sorted.square = i.url;
    } else {
      sorted.main = i.url;
    }
  });

  setter(sorted);
};

export default sortType;
