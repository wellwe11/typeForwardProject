const fetchWholeMd = async (url) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.error("Failed to fetch entire md: ", err);
    return null;
  }
};

export default fetchWholeMd;
