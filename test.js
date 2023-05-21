const words = ['apple', 'ocean', 'knife'];
const question = getWord(words);
function getWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const word = arr[randomIndex];
    return word;
}
let   lettersQuestion = question.split('').map(letter => letter.toUpperCase());
console.log(lettersQuestion);
