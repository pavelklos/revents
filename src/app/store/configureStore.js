// import { createStore, applyMiddleware, compose } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import firebase from '../config/firebase'

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
}

const configureStore = (preloadedState) => {
  // const middlewares = [thunk];
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  // const composedEnhancer = compose(...storeEnhancers);
  // const composedEnhancer = composeWithDevTools(...storeEnhancers);
  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  // Section 07.06 (video 56) : Improving the dev experience
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () => {
        const newRootReducer = require('../reducers/rootReducer').default;
        store.replaceReducer(newRootReducer)
      })
    }
  }

  return store;
};

export default configureStore;
