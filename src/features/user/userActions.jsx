import moment from 'moment';
import cuid from 'cuid'
import { toastr } from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';


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

export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      // name: fileName
      name: imageName
    };

    try {
      dispatch(asyncActionStart())
      // upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // ERROR in ORIGINAL FILE
      // let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
      // OK : https://firebase.google.com/docs/storage/web/upload-files
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile with new image
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        });
        await user.updateProfile({
          photoURL: downloadURL
        })
      }
      // add the new photo to photos collection
      // return await firestore.add({
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        // name: fileName,
        name: imageName,
        url: downloadURL
      })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError())
      throw new Error('Problem uploading photos');
    }
  }

export const deletePhoto = (photo) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      // DELETE FROM Storage
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.id}]
      })
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo')
    }
  }

export const setMainPhoto = photo =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      });
    } catch (error) {
      console.log(error);
      throw new Error('Problem setting main photo')
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