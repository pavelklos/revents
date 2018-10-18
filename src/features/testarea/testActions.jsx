import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants'

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