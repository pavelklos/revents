import { createReducer } from '../../app/common/util/reducerUtil'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants'

const initialState = {
  data: 571969
};

// 2. SOLUTION (with reducerUtil.js) - BETTER !!!
export const incrementCounter = (state, payload) => {
  return {...state, data: state.data + 1};
}
export const decrementCounter = (state, payload) => {
  return {...state, data: state.data - 1};
}
export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter
});

// 1. SOLUTION (without reducerUtil.js)
// const testReducer = (state = initialState, action) => {
//   // return state;

//   switch(action.type) {
//     case INCREMENT_COUNTER:
//       return {...state, data: state.data + 1};
//     case DECREMENT_COUNTER:
//       return {...state, data: state.data - 1};
//     default:
//       return state;
//   }
// };
// export default testReducer;
