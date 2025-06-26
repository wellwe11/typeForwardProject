const fetchText = async (data, thinSetter, boldSetter) => {
  return fetch(data)
    .then((res) => res.json())
    .then((mdText) => {
      if (thinSetter) {
        thinSetter(mdText.thin);
      }

      if (boldSetter) {
        boldSetter(mdText.bold);
      }
    })
    .catch((err) => console.error("Error loading markdown file:", err, data));
};

export default fetchText;
