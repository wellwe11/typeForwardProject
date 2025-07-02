function addSpaceBeforeCaps(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default addSpaceBeforeCaps;
