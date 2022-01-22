import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from './gameSettings'
import { useInterval } from './useInterval'
import { useState, useEffect, useRef } from 'react'

function App() {
  const canvasRef = useRef()
  const gameRef = useRef()
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [level, setLevel] = useState(1)
  const [dir, setDir] = useState([0,-1])
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setSpeed(700);
    setGameOver(false);
    setLevel(1);
  }

  const endGame = () => {

  }

  const moveSnake = ({ keyCode }) => {
    setDir(DIRECTIONS[keyCode]);
  }

  const spawnApple = () => {
    return apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i]) / SCALE)); 
  }

  const checkCollision = (snk = snake) => {
    const head = snk[0];
    if (
      head[0] < 0 || 
      head[0] * SCALE >= CANVAS_SIZE[0] ||
      head[1] < 0 ||
      head[1] * SCALE >= CANVAS_SIZE[1])
      return true;

    return false;
  }

  const checkAppleCollision = () => {
    const snakeHead = snake[0];

    if (snakeHead[0] == apple[0] && snakeHead[1] == apple[1]) {
      return true;
    } else {
      return false;
    }
  }

  const checkTargetCollision = (target, tmpSnake) => {
    const snakeHead = tmpSnake[0];
    if (snakeHead[0] == target[0] && snakeHead[1] == target[1]) {
      return true;
    } else {
      return false;
    }
  }

  const increaseDifficulty = () => {
    if (speed > 50) {
      setSpeed(speed - 50);
      setLevel(level + 1)
    } else if (speed <= 50 && speed > 20) {
      setSpeed(speed - 1);
      setLevel(level + 1)
    }
  }

  const gameLoop = () => {
    gameRef.current.focus();
    const tmpSnake = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [tmpSnake[0][0] + dir[0], tmpSnake[0][1] + dir[1]];

    tmpSnake.unshift(newSnakeHead); // move snake head 1 pixel to target direction

    if (!checkAppleCollision()) {
      tmpSnake.pop(); // remove last node of snake
    } else {
      let newApple = spawnApple();
      increaseDifficulty();
      while (checkTargetCollision(newApple, tmpSnake)) {
        newApple = spawnApple();
      }

      setApple(newApple);
    }

    if (checkCollision()) {
      setGameOver(true)
    }

    setSnake(tmpSnake)
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]); // Clear every render

    context.fillStyle = 'black';
    snake.forEach(([x,y]) => context.fillRect(x, y, 1, 1)); // render snake

    context.fillStyle = 'green';
    context.fillRect(apple[0], apple[1], 1, 1)

    if (gameOver) {
      context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    }
  }, [snake, apple, gameOver])

  useInterval(() => gameLoop(), speed)

  return (
    <div ref={gameRef} role='button' tabIndex='0' onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: 'solid 2px red' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <h2>React Snake Game</h2>
      <h3>Level {level}</h3>
      { gameOver && <h2>GAME OVER!</h2> }
      <button style={{ fontSize: 16 }}onClick={startGame}>Play!</button>
    </div>
  );
}

export default App;
