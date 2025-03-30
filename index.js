const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const gameOverDiv = document.getElementById("gameOver");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;
let currentDirection = "RIGHT";

function drawGame() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
  checkFoodCollision();
}

function drawSnake() {
  ctx.fillStyle = "#2ecc71";
  snake.forEach((segment, index) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  });
}

function drawFood() {
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (snake.length > score + 1) {
    snake.pop();
  }
}
function changeDirection(direction) {
  if (direction === "UP" && currentDirection !== "DOWN") {
    dx = 0;
    dy = -1;
    currentDirection = "UP";
  } else if (direction === "LEFT" && currentDirection !== "RIGHT") {
    dx = -1;
    dy = 0;
    currentDirection = "LEFT";
  } else if (direction === "DOWN" && currentDirection !== "UP") {
    dx = 0;
    dy = 1;
    currentDirection = "DOWN";
  } else if (direction === "RIGHT" && currentDirection !== "LEFT") {
    dx = 1;
    dy = 0;
    currentDirection = "RIGHT";
  }
}
function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    gameOver();
  }
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    scoreElement.innerText = `Score: ${score}`;
    generateFood();
  }
}
function generateFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
  // Ensure food does not spawn on the snake
  if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
    generateFood();
  }
}

function clearCanvas() {
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function gameOver() {
  clearInterval(gameLoop);
  gameOverDiv.style.display = "block";
  scoreElement.innerText = `Final Score: ${score}`;
}
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  dx = 0;
  dy = 0;
  score = 0;
  scoreElement.textContent = "0";
  currentDirection = "RIGHT";
  gameOverDiv.style.display = "none";
  gameLoop = setInterval(drawGame, 100);
}

// Event listeners for keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      changeDirection("UP");
      break;
    case "ArrowDown":
      changeDirection("DOWN");
      break;
    case "ArrowLeft":
      changeDirection("LEFT");
      break;
    case "ArrowRight":
      changeDirection("RIGHT");
      break;
    case "r": // Restart game on 'r' key
      restartGame();
      break;
  }
});

// Start the game loop
restartGame();
