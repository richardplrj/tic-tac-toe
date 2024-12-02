import { useState } from 'react'
import Square from './Square'

const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const allSquares = squares.slice()
    xIsNext ? (allSquares[i] = 'X') : (allSquares[i] = 'O')

    onPlay(allSquares)
  }

  const checkWinner = calculateWinner(squares)
  let status
  if (checkWinner) {
    status = 'Winner: ' + checkWinner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }
  const generateBoard = () => {
    const rows = []
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const squaresInRow = []
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const squareIndex = rowIndex * 3 + colIndex
        squaresInRow.push(
          <Square
            key={squareIndex}
            value={squares[squareIndex]}
            onSquareClick={() => handleClick(squareIndex)}
          />
        )
      }
      rows.push(<div className="board-row">{squaresInRow}</div>)
    }
    return rows
  }

  return (
    <>
      <div className="status">{status}</div>
      {generateBoard()}
    </>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }
  const moves = history.map((squares, move) => {
    let description
    console.log(`move is ${move} and curent move is ${currentMove}`)
    if (move === 0) {
      description = 'Go to game start'
    } else if (move === currentMove) {
      description = 'You are at move #' + move
    } else if (move > 0) {
      description = 'go to move #' + move
    }
    return (
      <li key={move}>
        {description.includes('You are at') ? (
          <p className="currentDescription">{description}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
export default Game
