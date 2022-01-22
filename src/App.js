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
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0,-1])
  const [speed, setSpeed] = useState(500)
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {

  }

  const endGame = () => {

  }

  const moveSnake = ({ keyCode }) => {
    setDir(DIRECTIONS[keyCode]);
  }

  const spawnApple = () => {

  }

  const checkCollision = () => {

  }

  const checkAppleCollision = () => {

  }

  const gameLoop = () => {
    const tmpSnake = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [tmpSnake[0][0] + dir[0], tmpSnake[0][1] + dir[1]];

    tmpSnake.unshift(newSnakeHead); // move snake head 1 pixel to target direction
    tmpSnake.pop(); // remove last node of snake

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
  }, [snake, apple, gameOver])

  useInterval(() => gameLoop(), speed)

  return (
    <div role='button' tabIndex='0' onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: 'solid 1px #000' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      { gameOver && <div>GAME OVER!</div> }
      <button onClick={startGame}>Play!</button>
    </div>
  );
}

export default App;
