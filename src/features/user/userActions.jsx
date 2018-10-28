import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    // console.log(user);
    const {isLoaded, isEmpty, ...updatedUser} = user;
    // console.log(updatedUser);
    // if (updatedUser.dateOfBirth) {
    // console.log(updatedUser.dateOfBirth);
    // console.log(getState().firebase.profile.dateOfBirth);
    // if (updatedUser.dateOfBirth) {
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      // console.log(updatedUser.dateOfBirth);
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
      // console.log(updatedUser.dateOfBirth);
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Profile updated')
    } catch (error) {
      console.log(error)
    }
  }



// import moment from 'moment';
// import { toastr } from 'react-redux-toastr'

// export const updateProfile = (user) =>
//   async (dispatch, getState, {getFirebase}) => {
//     const firebase = getFirebase();
//     const {isLoaded, isEmpty, ...updatedUser} = user;
//     if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
//       updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
//     }

//     try {
//       await firebase.updateProfile(updatedUser);
//       toastr.success('Success', 'Profile updated')
//     } catch (error) {
//       console.log(error)
//     }
//   }