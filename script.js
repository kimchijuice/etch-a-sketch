// create 16 x 16 grid
const container = document.querySelector('#container');

for (let i = 0; i < 16; i++) {
    // Create a row div
    const row = document.createElement('div');
    row.classList.add('grid-row');
    
    // Create 16 cells in each row
    for (let j = 0; j < 16; j++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        row.appendChild(cell);
    }
    
    container.appendChild(row);
}

// click to toggle hover effect function
const gridItems = document.querySelectorAll('.grid-item');
let isDrawing = false;

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        isDrawing = !isDrawing; // Toggle drawing state
        item.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    });

    item.addEventListener('mouseover', () => {
        if (isDrawing) {
            item.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        }
    });
});
 
// clear grid

const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', () => {
    gridItems.forEach( item => {
        item.style.backgroundColor = 'transparent';
    });
        
})

// add drop down menu to change grid size