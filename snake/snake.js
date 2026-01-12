const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

let dx = 10;
let dy = 0;
let foodX;
let foodY;
let score = 0;
let changingDirection = false;

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnakePart(part) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(part.x, part.y, 10, 10);
  ctx.strokeRect(part.x, part.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const ateFood = snake[0].x === foodX && snake[0].y === foodY;

  if (ateFood) {
    score += 10;
    document.getElementById("score").innerHTML = "Score: " + score;
    createFood();
  } else {
    snake.pop();
  }
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, 10, 10);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

  if (changingDirection) return;
  changingDirection = true;

  if (event.keyCode === LEFT && dx === 0) {
    dx = -10; dy = 0;
  }
  if (event.keyCode === UP && dy === 0) {
    dx = 0; dy = -10;
  }
  if (event.keyCode === RIGHT && dx === 0) {
    dx = 10; dy = 0;
  }
  if (event.keyCode === DOWN && dy === 0) {
    dx = 0; dy = 10;
  }
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
      return true;
  }

  return (
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 10
  );
}

function main() {
  if (didGameEnd()) {
    alert("Game Over! Score: " + score);
    return;
  }

  setTimeout(() => {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, 100);
}

createFood();
main();
