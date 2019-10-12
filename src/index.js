const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0'
};

function replace(str, search, replace) {
  return str.split(search).join(replace);
}
function decoderLetter(encodedStr, object) {
  for (let key in object) {
    if (key === encodedStr) {
      return (encodedStr = object[key]);
    }
  }
}
function decode(expr) {
  const space = '**********';
  const encodedLetterLength = 10;
  const arrNoSpace = expr.split(space);
  let encodedArr = new Array(arrNoSpace.length);
  let encodedWordLength = undefined;
  let encodedLetter = undefined;

  arrNoSpace.map((string, index) => {
    encodedWordLength = string.length;
    encodedLetter = encodedWordLength / encodedLetterLength;
    encodedArr[index] = new Array(encodedLetter);
  });

  arrNoSpace.map((string, index) => {
    for (i = index; i < encodedArr.length; i++) {
      let start = 0;
      const step = encodedLetterLength;
      let end = start + step;
      for (j = 0; j < encodedArr[i].length; j++) {
        encodedArr[i][j] = Array.from(string)
          .slice(start, end)
          .join('');
        start += step;
        end += step;
      }
      if (end > encodedWordLength) {
        break;
      }
    }
  });

  encodedArr.map((stringArr, stringInd) => {
    stringArr.map((wordArr, wordInd) => {
      const lengthStr = wordArr.length;
      let tempStr = wordArr;
      for (i = 0; i < lengthStr; i++) {
        if (tempStr[0] !== '0') {
          break;
        } else if (tempStr[0] === '0') {
          tempStr = tempStr.replace('0', ' ').trimStart();
          encodedArr[stringInd][wordInd] = tempStr;
        }
      }
    });
  });

  encodedArr.forEach((stringArr, stringInd) => {
    for (i = 0; i < stringArr.length; i++) {
      let tempStr = stringArr[i];
      tempStr = replace(tempStr, '10', '.');
      tempStr = replace(tempStr, '11', '-');
      encodedArr[stringInd][i] = tempStr;
    }
  });

  encodedArr.forEach((stringArr, stringInd) => {
    for (i = 0; i < stringArr.length; i++) {
      let tempStr = stringArr[i];
      tempStr = decoderLetter(tempStr, MORSE_TABLE);
      encodedArr[stringInd][i] = tempStr;
    }
  });

  const resultString = encodedArr.map(string => string.join('')).join(' ');
  return resultString;
}

module.exports = {
  decode
};
