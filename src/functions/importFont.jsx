const fetchText = async (data, thinSetter, boldSetter) => {
  return fetch(data)
    .then((res) => res.json())
    .then((mdText) => {
      thinSetter(mdText.thin);
      boldSetter(mdText.bold);
    })
    .catch((err) => console.error("Error loading markdown file:", err, data));
};

export default fetchText;
