// To decode listing titles like "&amp; Vineyard" to "&"
const parseHTMLEntities = (text) => {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

export default parseHTMLEntities;
