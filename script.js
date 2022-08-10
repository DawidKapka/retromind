const colors = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Purple'];

function start() {
    const startButton = document.querySelector('.start-button');
    const wrapper = document.querySelector('.wrapper');
    const game = document.querySelector('.game');
    wrapper.removeChild(startButton);
    game.style.display = "inherit";
    createColorFields();
}

function createColorFields() {
    const body = document.querySelector('.window-body');
    const wrapper = document.createElement('div');
    for (i of Array(12).keys()) {
        const row = document.createElement('div');
        row.classList.add('row');
        const roundTitle = document.createElement('p');
        roundTitle.classList.add('round-title')
        roundTitle.innerText = `Round ${i + 1}: `;
        row.appendChild(roundTitle);
        for (j of Array(4).keys()) {
            const field = document.createElement('select');
            field.classList.add('field');
            fillSelectWithColors(field)
            row.appendChild(field);
        }
        wrapper.appendChild(row);
    }
    body.appendChild(wrapper);
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
