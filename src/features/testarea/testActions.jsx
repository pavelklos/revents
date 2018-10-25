import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testConstants";

// REDUX - Action Creator for incrementCounter()
// pure function
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

// REDUX - Action Creator for decrementCounter()
// pure function
export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
}

export const startCounterAction = () => {
  return {
    type: COUNTER_ACTION_STARTED
  }
}

export const finishCounterAction = () => {
  return {
    type: COUNTER_ACTION_FINISHED
  }
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// REDUX THUNK
export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({type: INCREMENT_COUNTER});
    dispatch(finishCounterAction());
  }
}

// REDUX THUNK
export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({type: DECREMENT_COUNTER});
    dispatch(finishCounterAction());
  }
}