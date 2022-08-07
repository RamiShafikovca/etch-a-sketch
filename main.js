const gridContainer = document.getElementById('gridContainer');
const promptSlider = document.querySelector('input');
const sliderValue = document.querySelector('div#sliderValue');
const clearBtn = document.querySelector('button.clearGrid');
const colors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
const gruvColors = ['#cc241d', '#98971a', '#d79921', '#458588', '#b16286', '#689d6a', '#d65d0e'];
const GRIDSIZE = 500;
let colorCount = 0;

gridContainer.style.height = `${GRIDSIZE}px`;
gridContainer.style.width = `${GRIDSIZE}px`;

generateGrid();

//Event listener for displaying grid size
promptSlider.addEventListener('input', () => {
    sliderValue.innerHTML = `Size: ${promptSlider.value} x ${promptSlider.value}`;

});

//Re-generate the grid after new grid size is selected
promptSlider.addEventListener('mouseup', () => {
    generateGrid(promptSlider.value);

});

//Select each gridItem and reset their background color
clearBtn.addEventListener('click', () => {
    document.querySelectorAll('div.gridItem').forEach((item) => {
        item.style.backgroundColor = '';
    });
});

//Clear grid and then create and add specified number of grid items
function generateGrid (gridCount = promptSlider.value) {
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    let ITEMSIZE = GRIDSIZE / gridCount;
    for (let i = 0; i < gridCount; i++) {
        let gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
        gridContainer.append(gridRow);

        for (let j = 0; j < gridCount; j++) {
            let gridItem = document.createElement('div');
            gridItem.style = (`height: ${ITEMSIZE}px; aspect-ratio: 1 / 1; draggable=false`);
            gridItem.classList.add('gridItem');
            gridRow.append(gridItem);
        }
    }
    addGridListeners();
}

//Add listeners to each item that will color when the cursor passes through it
function addGridListeners () {
    const gridItems = document.querySelectorAll('div.gridItem');
    gridItems.forEach((item) => {
        item.addEventListener('mouseenter', () =>{
            fillGridItem(item);
        });
    });
}

//Fill by user-selected color scheme
function fillGridItem (item) {
    if (document.getElementById('black').checked) {
        item.style.backgroundColor = 'black';
    } else if (document.getElementById('rainbow').checked) {
        item.style.backgroundColor = colors[colorCount];
        colorCount = (colorCount + 1) % 7;
    } else if (document.getElementById('gruvbox').checked) {
        item.style.backgroundColor = gruvColors[colorCount];
        colorCount = (colorCount + 1) % 7;
    } else if (document.getElementById('random').checked) {
        item.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }
}