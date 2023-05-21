
//configuration
const nAttempts = 6;
const words = ['apple', 'ocean', 'knife'];
//, 'House', 'Tiger', 'Music', 'Angel', 'Smile', 'Fruit', 'Beach'];

//elements
const inputElement = document.getElementById('input-id');
const tryButtonElement = document.getElementById('try-id');
const resultsElement = document.getElementById('results-id');
const resultMessageElement = document.getElementById('game-result');
const playAgainButtonElement = document.getElementById('play-again-id');

// global variables
let count = 0;
const nLettersInTheWorrd = 5;
let answers = [];
let question = '';

//functions
function game() {
    const answer = inputElement.value;
   
    // проверки введенного слова (не должно повторяться, должно быть из 5 букв, только буквы от а до я)
    if (answer.split('').some(element => element.charCodeAt(0) < 'a'.charCodeAt(0) || element.charCodeAt(0) > 'z'.charCodeAt(0))) {
        alert('Word must contain only letters! Try again.')
    } else if (answer.length != 5) {
        alert('Word length must be 5 letters. Try to enter another word.')
    } else if (answers.includes(answer)) {
        alert('You already have use this word, try another one.')
    } else {
        answers.push(answer);
        if (answer == question) {
            finishGame(true);
            count++;
        }else{
            count++;
            if (count == nAttempts) {
                finishGame();
            }
        }
        fillSquares(answer, question);
    }
    inputElement.value = '';
}


function fillSquares(answer, question) {
 let   lettersAnswer = answer.split('');
 let   lettersQuestion = question.split('').map(letter => letter.toUpperCase());
    for (let i = 0; i < nLettersInTheWorrd; i ++) {
        const letterAnswer = lettersAnswer[i].toUpperCase();
        const square = document.getElementById(`sq-id${count}${i + 1}`);
        square.style.backgroundColor = 'gray';        
        if (letterAnswer === lettersQuestion[i]) {
            square.style.backgroundColor = 'green';
        } else if (lettersQuestion.includes(letterAnswer)) {
            square.style.backgroundColor = 'yellow';
        }
    square.innerHTML = letterAnswer;   
    }

}



function getWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const word = arr[randomIndex];
    return word;
}

function startGame() {
    resultsElement.innerHTML = getResultsSection(nLettersInTheWorrd)
    question = getWord(words);
    answers.length = 0;
    playAgainButtonElement.hidden = true;
    count = 0;
    resultMessageElement.innerHTML = '';
    tryButtonElement.disabled = false;
    inputElement.readOnly = false;
}


function getResultsSection(nLettersInTheWorrd) {
    const section = [];
    for (let i = 1; i <= nLettersInTheWorrd + 1; i++) {
        const row = [];
        for (let j = 1; j <= nLettersInTheWorrd; j++) {
            // let squareId = j;
            row.push(`<div class="square" id = "sq-id${i}${j}"></div>`);
        }
        section.push(row.join('')); // Объединяем элементы ряда в одну строку
    }
    const result = section.map((row, index) => {
        const rowId = index + 1;
        return `<div class = "row" id = "row-id${rowId}">${row}</div>`; // Оборачиваем каждый ряд в <div>
    });
    return result.join(''); // Объединяем все ряды в одну строку
}



function finishGame(winner = false) {
    tryButtonElement.disabled = true;
    inputElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    winner ? resultMessageElement.innerHTML = "Congratulation!" : resultMessageElement.innerHTML = "Game over";
}

tryButtonElement.addEventListener('click', game);
playAgainButtonElement.addEventListener('click', startGame);
startGame();

