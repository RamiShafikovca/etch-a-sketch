const gridContainer = document.getElementById('gridContainer');
const GRIDSIZE = 400;
gridContainer.setAttribute('style', `height: ${GRIDSIZE}px`);
gridContainer.setAttribute('style', `width: ${GRIDSIZE}px`);
const promptSlider = document.querySelector('input');
const sliderValue = document.querySelector('p#sliderValue');

generateGrid();

function generateGrid (GRIDCOUNT = 16) {
    let ITEMSIZE = GRIDSIZE / GRIDCOUNT;
    for (let i = 0; i < GRIDCOUNT; i++) {
        let gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
        gridContainer.append(gridRow);

        for (let j = 0; j < GRIDCOUNT; j++) {
            let gridItem = document.createElement('div');
            gridItem.setAttribute('style', `height: ${ITEMSIZE}px; aspect-ratio: 1 / 1`);
            gridItem.classList.add('gridItem');
            gridRow.append(gridItem);
        }
    }
    addGridListeners();
}


function addGridListeners () {
    const gridItems = document.querySelectorAll('div.gridItem');
    gridItems.forEach((item) => {
        item.addEventListener('mouseenter', () =>{
            item.classList.add('selected');
        });
    });
}

promptSlider.addEventListener('input', () => {
    console.log(promptSlider.value);
    sliderValue.innerHTML = `${promptSlider.value} x ${promptSlider.value}`;

});

promptSlider.addEventListener('mouseup', () =>{
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    generateGrid(promptSlider.value);

});