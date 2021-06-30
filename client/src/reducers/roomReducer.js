import { LOAD_ROOM_DATA, FAIL_ROOM_DATA } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ROOM_DATA:
      return { ...state, payload };

    // case FAIL_ROOM_DATA:
    //   return state.filter((alert) => alert.id !== payload.id);

    default:
      return state;
  }
}
