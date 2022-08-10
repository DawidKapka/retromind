const colors = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Purple'];
const randomColors = [];
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
        if (!result) looseRound();
        else validateColors(chosenColors);
    })
}

function looseRound() {
    round++;
    removeGuessButton()
    createRoundField(document.querySelector('.game-wrapper'));
    addGuessButton();
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

function validateColors() {

}
