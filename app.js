const startGameButton = document.getElementById('start-game-button');
const resetButton = document.getElementById('reset-button');
const fullWordElement = document.getElementById('full-word-element');
const fullWordInput = document.getElementById('word-input');
const phraseLabel = document.getElementById('phrase-label');
const hintInput = document.getElementById('hint-input');
const enterGuessDiv = document.getElementById('enter-guess-div');
const enterGuessInput = document.getElementById('enter-guess-input');
const numGuessElement = document.getElementById('num-guess-element');
const lettersElement = document.getElementById('word-label-letters');
const wrongGuessesDiv = document.getElementById('wrong-guesses-element');
const wrongGuessInput = document.getElementById('wrong-guess-input');
var letterArray = [];

function startGame() {
    setStartGameHiddenStatus();
    enterGuessInput.value = '';
    letterArray = fullWordInput.value.split("");
    createLetters();
}

function resetGame() {
    setResetGameHiddenStatus();
    resetFields();
    destroyLetters();
}

function createLetters() {
    for (let index = 0; index < letterArray.length; index++) {
        const letter = letterArray[index];
        const newSpan = document.createElement("span");
        newSpan.classList.add('hang-letter');
        newSpan.classList.add('uncovered-letter');
        newSpan.innerText = letter;
        lettersElement.appendChild(newSpan);
    }
}

function destroyLetters() {
    lettersElement.innerHTML = '';
}

function setStartGameHiddenStatus() {
    startGameButton.classList.add('hidden');
    phraseLabel.classList.add('hidden');
    fullWordElement.classList.add('hidden');
    resetButton.classList.remove('hidden');
    enterGuessDiv.classList.remove('hidden')
    lettersElement.classList.remove('hidden');
    wrongGuessesDiv.classList.remove('hidden');
}

function setResetGameHiddenStatus() {
    resetButton.classList.add('hidden');
    enterGuessDiv.classList.add('hidden');
    lettersElement.classList.add('hidden');
    wrongGuessesDiv.classList.add('hidden');
    startGameButton.classList.remove('hidden');
    fullWordElement.classList.remove('hidden');
    phraseLabel.classList.remove('hidden');
}

function resetFields() {
    //fullWordInput.value = '';
    hintInput.value = '';
    enterGuessInput.value = '';
    numGuessElement.value = '7';
    wrongGuessInput.textContent = '';
}

function checkGuess(guess) {
    enterGuessInput.value = '';
    correctGuesses = [];
    if (letterArray.indexOf(guess) > -1) {
        for (let index = 0; index < letterArray.length; index++) {
            const letter = letterArray[index];
            if (letter == guess) {
                lettersElement.childNodes[index].classList.remove('uncovered-letter');
                lettersElement.childNodes[index].classList.add('revealed-letter');
            }
        }
    }
    else {
        if (wrongGuessInput.textContent.indexOf(guess) < 0) {
            wrongGuessInput.textContent += guess;
            var curGuesses = parseInt(numGuessElement.value);
            curGuesses = curGuesses - 1;
            numGuessElement.value = curGuesses.toString();
        }
    }

    // check game over or win
}

function checkGameStatus() {

}

enterGuessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess(this.value);
        checkGameStatus();
    }
}); 