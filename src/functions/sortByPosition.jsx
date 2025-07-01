const sortByPosition = (items) => {
  return items.sort(
    ([, a], [, b]) => +a?._embedded.info.position - +b?._embedded.info.position
  );
};

export default sortByPosition;
