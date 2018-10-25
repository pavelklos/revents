import { createReducer } from "../../app/common/util/reducerUtil";
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testConstants";

const initialState = {
  data: 571969,
  loading: false
};

// 2. SOLUTION (with reducerUtil.js) - BETTER !!!
export const incrementCounter = (state, payload) => {
  return {...state, data: state.data + 1};
}
export const decrementCounter = (state, payload) => {
  return {...state, data: state.data - 1};
}

export const counterActionStarted = (state, payload) => {
  return {...state, loading: true }
}
export const counterActionFinished = (state, payload) => {
  return {...state, loading: false }
}


export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
  [COUNTER_ACTION_STARTED]: counterActionStarted,
  [COUNTER_ACTION_FINISHED]: counterActionFinished
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
