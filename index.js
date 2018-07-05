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

function streak(board, firstCoord, ...remainCoords){
  console.log(firstCoord, remainCoords)
  const newBoard = game.getState().board
  return remainCoords//? firstCoord : undefined

}

function winner(theBoard) {
  const board = game.getState().board
  let outcome = null
  // let item = thisBoard.getIn([1,1])

  // console.log('ITEM:', item)

  // let row = board.getIn(1,1)
  console.log('WINNER:', streak(board, [1,0], [1,1], [1,2]))
  // check the rows
  // console.log('BEFORE CREATING ROW')
  // const row = Map({0: 'X', 1: 'X', 2: 'X'})
  // console.log('THE VALUES', row.values(), row.values.every(val => val === row.values()[0]))

  // check the columns

  // check first diagonal

  //check second diagonal


  return outcome
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

