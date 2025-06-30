const fetchAllText = async (data) => {
  const res = await fetch(data);
  const json = await res.json();

  if (json) {
    return {
      bigTitle: json.bigTitle,
      boldText: json.bold,
      thinText: json.thin,
      bioText: json.bio,
      sections: json.sections,
      link: json.link,
      linkTo: json.linkTo,
      codeText: json.codeText,
    };
  } else {
    console.error("fetchAllText cannot fetch data:", data);
  }
};

export default fetchAllText;
