// Function to create grid
function createGrid(size) {
    const container = document.querySelector('#container');
    
    // Clear existing grid
    container.innerHTML = '';
    
    for (let i = 0; i < size; i++) {
        // Create a row div
        const row = document.createElement('div');
        row.classList.add('grid-row');
        
        // Create cells in each row
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
    
    // Re-add event listeners to new grid items
    setupGridEventListeners();
}

// Function to setup event listeners for grid items
function setupGridEventListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    let isDrawing = false;

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            isDrawing = !isDrawing;
            item.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        });

        item.addEventListener('mouseover', () => {
            if (isDrawing) {
                item.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            }
        });
    });
}

// Initial grid creation
createGrid(16);

// Update grid size functionality
const updateGridBtn = document.querySelector('#updateGrid');
const gridSizeInput = document.querySelector('#gridSize');

updateGridBtn.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    
    // Validate input
    if (isNaN(newSize)) {
        alert('Please enter a valid number');
        return;
    }
    
    if (newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    
    createGrid(newSize);
});

// Clear grid functionality
const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = 'transparent';
    });
});

// Add input validation for the gridSize input
gridSizeInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    
    if (value > 100) {
        e.target.value = 100;
    } else if (value < 1) {
        e.target.value = 1;
    }
});