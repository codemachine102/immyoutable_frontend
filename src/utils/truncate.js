export const truncate = (text = '', maxLength = 25, symbol = '...') => {
  if (text.length > maxLength) {
    const truncatedText = text.slice(0, maxLength) + symbol;
    return truncatedText;
  } else {
    return text;
  }
};
