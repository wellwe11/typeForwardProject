const fetchFontStyle = (type) => {
  if (!type[0] || !type[1]) return;

  const fontEntries = Object.entries(type?.[1]?.fonts);

  const style = document.createElement("style");
  style.id = `dynamic-font-${type?.[0]}`;
  style.innerHTML = `
      @font-face {
        font-family: '${type?.[0]}';
        src: url('${fontEntries?.[0]?.[1]?.[0]?.url}');
        font-weight: normal;
        font-style: normal;
      }
    `;

  document.head.appendChild(style);

  return () => {
    const existing = document.getElementById(`dynamic-font-${type[0]}`);
    if (existing) document.head.removeChild(existing);
  };
};

export default fetchFontStyle;
