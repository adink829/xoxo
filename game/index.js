import { Map } from 'immutable';

const MOVE = 'MOVE';

export const move = (player, position) => {
  return { type: MOVE, position: position, turn: player };
}


const initialState = { board: Map(), turn: 'O' };

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  if (action.type === 'MOVE') {
    newState.board = newState.board.setIn(action.position, action.turn);
    newState.turn = action.turn === 'X' ? 'O' : 'X';
  }
  return newState;
}
