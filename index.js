import inquirer from 'inquirer'
import gameReducer, { move } from './game'
import { createStore } from 'redux'
import { Map } from 'immutable';


const printBoard = () => {
  const { board } = game.getState()
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], '_'))
    }
    process.stdout.write('\n')
  }
}

const getInput = player => async () => {
  const { turn } = game.getState()
  //console.log('GET INPUT START', "turn:", turn, "player:", player)
  if (turn !== player) return
  const ans = await inquirer.prompt([{
    type: 'input',
    name: 'coord',
    message: `${turn}'s move (row,col):`
  }])
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x)
  game.dispatch(move(turn, [row, col]))
}

function streak(board, firstCoord, ...remainCoords) {
  //console.log('COORDS IN STREAK:', firstCoord, remainCoords)
  const newBoard = game.getState().board
  const firstValue = newBoard.getIn(firstCoord)

  for (let i = 0; i < remainCoords.length; i++) {
    if (!(newBoard.getIn(remainCoords[i]) === firstValue)) {
      //console.log('IN THE LOOP:', remainCoords[i])
      return undefined
    }
    else if (newBoard.getIn(remainCoords[i]) === firstValue) {
      //console.log('FIRST VALUE:', firstValue)
      continue;
    }
  }
  return firstValue;
  //return remainCoords//? firstCoord : undefined

}

function winner(theBoard) {
  const board = game.getState().board
  let outcome = null
  const winners = [
    [[0, 0], [0, 1], [0, 2]]
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ]
  winners.forEach((arr) => {
    let firstCoord = arr[0]
    let remainCoords = arr.slice(1)
    if (streak(board, firstCoord, remainCoords)) {
      console.log('IF:', streak(board, firstCoord, remainCoords))
      return streak(board, firstCoord, remainCoords);
    }
    else {
      console.log('ELSE:', null)
      return null
    }
  }
  )

  // let item = thisBoard.getIn([1,1])

  // console.log('ITEM:', item)

  // let row = board.getIn(1,1)
  // check the rows
  // console.log('BEFORE CREATING ROW')
  // const row = Map({0: 'X', 1: 'X', 2: 'X'})
  // console.log('THE VALUES', row.values(), row.values.every(val => val === row.values()[0]))

  // check the columns

  // check first diagonal

  //check second diagonal

}

// Create the store - game starts running
const game = createStore(gameReducer)


// Debug: Print the state
game.subscribe(() => console.log(game.getState()))

game.subscribe(printBoard)
game.subscribe(getInput('X'))
game.subscribe(getInput('O'))

game.subscribe(winner)

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: 'START' })

