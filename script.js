// create 16 x 16 grid
const container = document.querySelector('#container');

for (let i = 0; i < 257; i++)  {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    container.appendChild(div);
}

// hover effect
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