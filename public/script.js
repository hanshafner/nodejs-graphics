const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let currentPosition = { x: 200, y: 200 };  // Start from the center of the canvas
ctx.beginPath();                           // Start the drawing path
ctx.moveTo(currentPosition.x, currentPosition.y); // Move to the initial position

let keys = {};
const stepSize = 10;

// Capture key presses
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  delete keys[event.key];
});

document.getElementById('lineWidth').addEventListener('change', function() {
  ctx.lineWidth = this.value;
});

document.getElementById('colorPicker').addEventListener('change', function() {
  ctx.strokeStyle = this.value;
});

function drawLine() {
  // Check and update position based on keys pressed
  if (keys['ArrowUp']) currentPosition.y -= stepSize;
  if (keys['ArrowDown']) currentPosition.y += stepSize;
  if (keys['ArrowLeft']) currentPosition.x -= stepSize;
  if (keys['ArrowRight']) currentPosition.x += stepSize;

  // Ensure the currentPosition does not go off canvas
  currentPosition.x = Math.max(0, Math.min(canvas.width, currentPosition.x));
  currentPosition.y = Math.max(0, Math.min(canvas.height, currentPosition.y));

  // Draw a line to the new position
  ctx.lineTo(currentPosition.x, currentPosition.y);
  ctx.stroke();   // Execute the drawing

  // Start a new path segment to avoid diagonal lines on direction changes
  ctx.beginPath();
  ctx.moveTo(currentPosition.x, currentPosition.y);
}

// Game loop to handle drawing
function update() {
  drawLine();
  requestAnimationFrame(update); // Continuously execute update for smooth animation
}

update(); // Start the animation loop
