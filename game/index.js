import {Map} from 'immutable'

const MOVE = 'MOVE'

const move = (player, position) => {
  return {type: MOVE, position: position, player: player}
}


const initialState = {board: Map()}

export default function reducer(state = initialState, action) {
  if (action.type === 'MOVE') {
    return {board: state.board.setIn(action.player, action.position)}
  }
  return state
}
