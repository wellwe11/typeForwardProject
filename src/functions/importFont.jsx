const fetchText = async (data, thinSetter, boldSetter) => {
  return fetch(data)
    .then((res) => res.json())
    .then((mdText) => {
      if (thinSetter && mdText.thin) {
        thinSetter(mdText.thin);
      }

      if (boldSetter && mdText.bold) {
        boldSetter(mdText.bold);
      }
    })
    .catch((err) => console.error("Error loading markdown file:", err, data));
};

export default fetchText;
