const colors = ['red', 'blue', 'green', 'yellow', 'white', 'purple'];
const randomColors = [];
const rounds = [];
let round = 1;

function start() {
    const startButton = document.querySelector('.start-button');
    const wrapper = document.querySelector('.wrapper');
    const game = document.querySelector('.game');
    wrapper.removeChild(startButton);
    game.style.display = "inherit";
    generateRandomColors()
    createWrapper();
    createRoundField(document.querySelector('.game-wrapper'));
    addGuessButton();
}

function generateRandomColors() {
    for (i of Array(4).keys()) {
        randomColors.push(colors[Math.floor(Math.random() * 6)]);
    }
    console.log(randomColors);
}

function createWrapper() {
    const body = document.querySelector('.window-body');
    const wrapper = document.createElement('div');
    wrapper.classList.add('game-wrapper')
    body.appendChild(wrapper);
}

function createRoundField(div) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.id = `row-${round}`;
    const roundTitle = document.createElement('p');
    roundTitle.classList.add('round-title')
    roundTitle.innerText = `Round ${round}: `;
    row.appendChild(roundTitle);
    for (j of Array(4).keys()) {
        const field = document.createElement('select');
        field.classList.add('field');
        fillSelectWithColors(field)
        row.appendChild(field);
    }
    div.appendChild(row);
}

function fillSelectWithColors(selectElement) {
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('disabled', 'true');
    defaultOption.setAttribute('selected', 'true');
    defaultOption.setAttribute('value', '');
    defaultOption.innerText = 'Select Color';
    selectElement.appendChild(defaultOption);
    colors.forEach(color => {
        const choice = document.createElement('option');
        choice.setAttribute('value', color.toLowerCase());
        choice.innerText = color;
        selectElement.appendChild(choice);
    })
}

function addGuessButton() {
    const body = document.querySelector('.game-wrapper');
    const button = document.createElement('button');
    button.classList.add('guess-button');
    button.innerText = 'Guess Colors';
    button.onclick = guess;
    body.appendChild(button);
}

function removeGuessButton() {
    const body = document.querySelector('.game-wrapper');
    const button = document.querySelector('.guess-button');
    body.removeChild(button);
}

async function guess() {
    const lastRound = document.querySelector(`#row-${round}`);
    const chosenColors = [];
    lastRound.querySelectorAll('select').forEach(select => {
        chosenColors.push(select.value);
    })
    validateInput(chosenColors).then(result => {
        if (!result) {
            showError();
        }
        else {
            if (validateColors(chosenColors)) {
                win();
            } else {
                looseRound();
            }
        }
    })
}

function looseRound() {
    round++;
    removeGuessButton()
    createRoundField(document.querySelector('.game-wrapper'));
    refillFields();
    addGuessButton();
}

function refillFields() {
    rounds.forEach((round, i) => {
        round.colors.forEach((color, index) => {
            const fields = document.querySelector(`#row-${i + 1}`).querySelectorAll('.field');
            fields[index].querySelector(`[value="${color}"]`).setAttribute('selected', 'true');
        });
    })
}

function validateInput(choices) {
    return new Promise((resolve) => {
        choices.forEach(choice => {
            if (choice === '') {
                resolve(false);
            }
        })
        resolve(true)
    })
}

function showError() {
    const window = document.createElement('div');
    window.classList.add('dialog')
    const error = `
    <div class="window error-window">
                <div class="title-bar">
                <div class="title-bar-text">
                    Error
                </div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close" onclick="closeError()"></button>
                </div>
            </div>
        <div class="window-body">
            <p>You need to choose 4 colors!</p>
            <button onclick="closeError()">Ok</button>
        </div>
    </div>
    `;
    window.innerHTML = error;
    document.body.appendChild(window);
}

function closeError() {
    const dialog = document.querySelector('.dialog');
    document.body.removeChild(dialog);
}

function validateColors(choices) {
    const correctlyPositioned = checkCorrectPositions(choices);
    const correctColors = checkCorrectColors(combineArrays(choices));
    const roundDiv = document.querySelector(`#row-${round}`);
    roundDiv.innerHTML += `<p class="round-info">Correctly positioned: ${correctlyPositioned}, Correct colors: ${correctColors}</p>`
    rounds.push({colors: choices, correctlyPositioned: correctlyPositioned, correctColors: correctColors});
    return correctlyPositioned === 4;
}

function checkCorrectPositions(choices) {
    let correctAmount = 0;
    choices.forEach((choice, index) => {
        if (choice === randomColors[index].toLowerCase()) {
            choice = '';
            correctAmount++;
        }
    })
    return correctAmount;
}

function checkCorrectColors(choices) {
    let correctAmount = 0;
    choices.forEach((choice) => {
        choices.forEach(chosenChoice => {
            if (choice.correct === chosenChoice.chosen) {
                choices.splice(choices.indexOf(choice));
                correctAmount++;
            }
        })
    })
    return correctAmount;
}

function combineArrays(choices) {
    const combined = [];
    for (let i = 0; i < 4; i++) {
        if (choices[i] !== randomColors[i]) {
            combined.push({correct: randomColors[i], chosen: choices[i]});
        }
    }
    return combined;
}

function reload() {
    window.location.reload();
}

function win() {
    const body = document.querySelector('.window-body');
    const gameBody = document.querySelector('.game-wrapper');
    body.removeChild(gameBody);
    const victoryText = document.createElement('div');
    victoryText.classList.add('victory');
    victoryText.innerHTML = `
        <p>You Won!</p>
        <div class="restart-wrapper">
            <button onclick="reload()">Play Again</button>
        </div>
    `;
    body.appendChild(victoryText);
}
