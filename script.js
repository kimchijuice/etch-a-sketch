// Color palette
const colors = {
    'Bubble Gum': '#FFD1DC',
    'Mint Dream': '#98FF98',
    'Lavender Mist': '#E6E6FA',
    'Peach Puff': '#FFDAB9',
    'Sky Blue': '#87CEEB',
    'Lemon Chiffon': '#FFFACD'
};

let currentColor = '#FFD1DC'; // Default color (Bubble Gum)

// Function to create color picker
function createColorPicker() {
    const colorPicker = document.querySelector('#pick-a-color');
    
    Object.entries(colors).forEach(([name, color]) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.title = name;
        
        // Set initial selected state
        if (color === currentColor) {
            colorOption.classList.add('selected');
        }
        
        colorOption.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            colorOption.classList.add('selected');
            currentColor = color;
        });
        
        colorPicker.appendChild(colorOption);
    });
}

// Function to create grid
function createGrid(size) {
    const container = document.querySelector('#container');
    
    // Clear existing grid
    container.innerHTML = '';
    
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
    
    setupGridEventListeners();
}

// Function to handle drawing on a cell
function drawOnCell(cell) {
    if (isDrawing) {
        cell.style.backgroundColor = currentColor;
    }
}

// Function to setup event listeners for grid items
function setupGridEventListeners() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        // Mouse events
        item.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent unwanted drag effects
            isDrawing = !isDrawing;
            drawOnCell(item);
        });

        item.addEventListener('mouseover', () => {
            drawOnCell(item);
        });

        // Touch events
        item.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling while drawing
            isDrawing = !isDrawing;
            drawOnCell(item);
        }, { passive: false });

        item.addEventListener('touchmove', (e) => {
            e.preventDefault();
            // Get the touch position
            const touch = e.touches[0];
            // Get the element at the touch position
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            // If the element is a grid item, draw on it
            if (element && element.classList.contains('grid-item')) {
                drawOnCell(element);
            }
        }, { passive: false });
    });

    // Add document-level touch end listener to handle cases where touch ends outside grid
    document.addEventListener('touchend', () => {
        isDrawing = false;
    });

    // Add document-level mouse up listener to handle cases where mouse is released outside grid
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

// Initialize color picker
createColorPicker();

// Initial grid creation
createGrid(16);

// Update grid size functionality
const updateGridBtn = document.querySelector('#updateGrid');
const gridSizeInput = document.querySelector('#gridSize');

updateGridBtn.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    
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