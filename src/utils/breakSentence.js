export function breakSentence(sentence = '', maxSentenceLength = 20) {
  // check if sentence length exceeds maximum
  if (sentence.length > maxSentenceLength) {
    // find the word that exceeds the maximum length
    const words = sentence.split(' ');
    let currentLength = 0;
    let breakIndex = -1;
    for (let i = 0; i < words.length; i++) {
      currentLength += words[i].length + 1; // add 1 for space between words
      if (currentLength > maxSentenceLength) {
        breakIndex = i;
        break;
      }
    }

    // insert break line after the word that exceeds the maximum length
    if (breakIndex !== -1) {
      const firstHalf = words.slice(0, breakIndex).join(' ');
      const secondHalf = words.slice(breakIndex).join(' ');
      return { first: firstHalf, second: secondHalf };
    }
  }

  return { first: sentence };
}
