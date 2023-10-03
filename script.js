const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 100;  // Base size of cells
const numColumns = 4;  // Number of columns and rows
const numRows = 6;  // Number of columns and rows
let scale = 1;         // Initial scale

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const randomIndex = Math.floor(Math.random() * 3);
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
      // First column: Triangle
      if (i === 0) {
        drawTriangle(i * cellSize, j * cellSize, cellSize);
      }
      // Last column: Bold 'O'
      else if (i === numColumns - 1) {
        drawBoldO(i * cellSize, j * cellSize, cellSize);
      }
      //for drawing the random columns
      else if (i>0 && i<numColumns - 1 && j<2 )
      {
        if( i*j == randomIndex)
        drawSymbol(i,j,cellSize);
      }
        // Middle columns: ® and ° alternatively
        
      else {
        ctx.font = `bold ${Math.min(14 * scale, 14)}px Arial`; // Increase font size with zoom
        ctx.fillText(i % 2 === 1 ? '®' : '°', i * cellSize + cellSize / 2, j * cellSize + cellSize / 2);
      }
    }
  }
}


function drawSymbol(i, j,size) {
    ctx.font = `${Math.min(14 * scale, 14)}px Arial`; // Increase font size with zoom
    const symbols = ['RE', '$', '*', '*'];
    const offsets = [
      { x: 1 / 8, y: 1 / 6 },               // Top-left corner
      { x: 1 / 8, y: 5 / 6 },               // Bottom-left corner
      { x: 7 / 8, y: 1 / 6 },               // Top-right corner
      { x: 7 / 8, y: 5 / 6 },               // Bottom-right corner
      { x: 1 / 2, y: 1 / 2 }                // Center
    ];
  
    symbols.forEach((s, index) => {
      const offsetX = cellSize * offsets[index].x;
      const offsetY = cellSize * offsets[index].y;
      ctx.fillText(s, i * cellSize + offsetX, j * cellSize + offsetY);
    });
    ctx.fillText('1', i * cellSize + cellSize / 2, j * cellSize + cellSize / 2);
  }


function drawTriangle(x, y, size) {
    const adjustedSize = size * scale;  // Adjust the size based on scale
    const padding = adjustedSize * 0.25;
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y + padding);
    ctx.lineTo(x + padding, y + size - padding);
    ctx.lineTo(x + size - padding, y + size - padding);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawBoldO(x, y, size) {
    const adjustedSize = size * scale;  // Adjust the size based on scale
    const outerRadius = (adjustedSize / 2) - 10;
    const innerRadius = outerRadius - 5;// This keeps the border 5 pixels thick
  
    // Outer circle - filled with black
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  
    // Inner circle - filled with white to give the "O" impression
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function zoomIn() {
    scale += 0.1;
    canvas.style.transform = `scale(${scale})`;
    draw();
}
  
function zoomOut() {
    scale -= 0.1;
    canvas.style.transform = `scale(${scale})`;
    draw()
}
  
draw();
    