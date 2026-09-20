const startGameButton = document.getElementById('start-game-button');
const resetButton = document.getElementById('reset-button');
const fullWordElement = document.getElementById('full-word-element');
const fullWordInput = document.getElementById('word-input');
const phraseLabel = document.getElementById('phrase-label');
const hintInput = document.getElementById('hint-input');
const hintText = document.getElementById('hint-tex');
const enterGuessDiv = document.getElementById('enter-guess-div');
const enterGuessInput = document.getElementById('enter-guess-input');
const numGuessElement = document.getElementById('num-guess-element');
const lettersElement = document.getElementById('game-box');
const wrongGuessesDiv = document.getElementById('wrong-guesses-element');
const wrongGuessInput = document.getElementById('wrong-guess-input');

function startGame() {
    setStartGameHiddenStatus();
    enterGuessInput.value = '';
    hintText.textContent = hintInput.value;
    createLetters();
}

function resetGame() {
    setResetGameHiddenStatus();
    resetFields();
    destroyLetters();
}

function createLetters() {
    let words = fullWordInput.value.split(" ");
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let letterArray = word.split("");
        const list = document.createElement("ul");
        list.classList.add("word-display");
        for (let index = 0; index < letterArray.length; index++) {
            const letter = letterArray[index];
            if (/^[A-Za-z]+$/.test(letter)) {
                const newSpan = document.createElement("li");
                newSpan.classList.add('letter');
                newSpan.classList.add('uncovered-letter');
                newSpan.innerText = letter;
                list.appendChild(newSpan);
            }
            else {
                const newSpan = document.createElement("li");
                newSpan.classList.add('letter');
                newSpan.classList.add('special-character');
                newSpan.innerText = letter;
                list.appendChild(newSpan);
            }
        }
        lettersElement.appendChild(list)
    }
}

function destroyLetters() {
    lettersElement.innerHTML = '';
}

function setStartGameHiddenStatus() {
    startGameButton.classList.add('hidden');
    phraseLabel.classList.add('hidden');
    fullWordElement.classList.add('hidden');
    //resetButton.classList.remove('hidden');
    enterGuessDiv.classList.remove('hidden')
    lettersElement.classList.remove('hidden');
    wrongGuessesDiv.classList.remove('hidden');

    hintInput.classList.add('hidden')
    hintText.classList.remove('hidden')
}

function setResetGameHiddenStatus() {
    //resetButton.classList.add('hidden');
    enterGuessDiv.classList.add('hidden');
    lettersElement.classList.add('hidden');
    wrongGuessesDiv.classList.add('hidden');
    startGameButton.classList.remove('hidden');
    fullWordElement.classList.remove('hidden');
    phraseLabel.classList.remove('hidden');

    hintInput.classList.remove('hidden')
    hintText.classList.add('hidden')
}

function resetFields() {
    //fullWordInput.value = '';
    hintInput.value = '';
    enterGuessInput.value = '';
    numGuessElement.value = '7';
    wrongGuessInput.textContent = '';
}

function checkGuess(guess) {
    const phrase = fullWordInput.value.toUpperCase();
    const words = phrase.split(" ");
    const curGuess = guess.toUpperCase();
    enterGuessInput.value = '';
    let correct = false;
    if (/^[A-Z]+$/.test(curGuess) == false) return;
    for (let i1 = 0; i1 < words.length; i1++) {
        const word = words[i1];
        if (word.indexOf(curGuess) > -1) {
            for (let i2 = 0; i2 < word.length; i2++) {
                const letter = word[i2];
                if (letter == curGuess) {
                    lettersElement.childNodes[i1].childNodes[i2].classList.add('guessed');
                    correct = true;
                }
            }
        }
    }
    if (correct == false && wrongGuessInput.textContent.indexOf(curGuess) < 0) {
            wrongGuessInput.textContent += curGuess;
            let curGuesses = parseInt(numGuessElement.value);
            curGuesses = curGuesses - 1;
            numGuessElement.value = curGuesses.toString();
    }
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

window.onload = resetGame;