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
    console.log(words);
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
        /*
        const newSpan = document.createElement("span");
        newSpan.classList.add('special-character');
        newSpan.innerText = " ";
        lettersElement.appendChild(newSpan);
        */
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
    enterGuessInput.value = '';
    if (/^[A-Za-z]+$/.test(guess) == false) return;
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
            let curGuesses = parseInt(numGuessElement.value);
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

window.onload = resetGame;