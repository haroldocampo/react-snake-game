import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from './gameSettings'
import { useState, useEffect, useRef } from 'react'

function App() {
  const canvasRef = useRef()
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0,-1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {

  }

  const endGame = () => {

  }

  const moveSnake = (e) => {

  }

  const spawnApple = () => {

  }

  const checkCollision = () => {

  }

  const checkAppleCollision = () => {

  }

  const gameLoop = () => {

  }

  return (
    <div role='button' tabIndex='0' keyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: 'solid 1px #000' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      { gameOver && <div>GAME OVER!</div> }
      <button onClick={startGame}></button>
    </div>
  );
}

export default App;
