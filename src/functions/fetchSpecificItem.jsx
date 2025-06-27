const fetchSpecificItem = async (data, goal) => {
  return fetch(data)
    .then((res) => res.json())
    .then((mdGoal) => mdGoal[goal])
    .catch((err) => console.error("Error loading markdown file:", err, data));
};

export default fetchSpecificItem;
