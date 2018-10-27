// import { LOGIN_USER, SIGN_OUT_USER } from './authConstants'
import { SubmissionError, reset } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { closeModal } from '../modals/modalActions'

// export const login = (creds) => {
  // return {
  //   type: LOGIN_USER,
  //   payload: {
  //     creds
  //   }
  // }

  // return dispatch => {
  //   dispatch({type: LOGIN_USER, payload: {creds}})
  //   dispatch(closeModal())
  // }
// }

export const login = (creds) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal())
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        // _error: error.message
        _error: 'Login failed'
      })
    }
  }
}

export const registerUser = (user) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in firebase auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log(user);
      // console.log(createdUser);
      console.log(createdUser.user);
      // console.log(createdUser.uid)
      console.log(createdUser.user.uid)
      // update the auth profile
      
      // await createdUser.updateProfile({
      await createdUser.user.updateProfile({
        displayName: user.displayName
      })

      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      // await firestore.set(`users/${createdUser.uid}`, {...newUser})
      await firestore.set(`users/${createdUser.user.uid}`, {...newUser})
      dispatch(closeModal());
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

export const socialLogin = (selectedProvider) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      // console.log(firebase);
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      console.log(user)
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (error) {
      console.log('socialLogin(.) ' + error)
    }
  }

export const updatePassword = (creds) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    // console.log(firebase.auth().currentUser);
    // console.log(creds.newPassword1);
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }


// export const logout = () => {
//   return {
//     type: SIGN_OUT_USER
//   }
// }