import { toastr } from 'react-redux-toastr'
// import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
// import { DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
import { DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from "../../app/data/mockApi";
import { createNewEvent } from '../../app/common/util/helpers'
import moment from 'moment'
import firebase from '../../app/config/firebase'

// export const fetchEvents = (events) => {
//   return {
//     type: FETCH_EVENTS,
//     payload: events
//   }
// }

export const createEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,{
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      })
      toastr.success('Success!', 'Event has been created')
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong')
    }
  }

  // return async dispatch => {
  //   try {
  //     dispatch({
  //       type: CREATE_EVENT,
  //       payload: {
  //         event
  //       }
  //     });
  //     toastr.success('Success!', 'Event has been created')
  //   } catch (error) {
  //     toastr.error('Oops!', 'Something went wrong')
  //   }
  // }

  // return {
  //   type: CREATE_EVENT,
  //   payload: {
  //     event
  //   }
  // }
}

export const updateEvent = event => {

  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success', 'Event has been updated')
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong')
    }
  }
  
  // return async dispatch => {
  //   try {
  //     dispatch({
  //       type: UPDATE_EVENT,
  //       payload: {
  //         event
  //       }
  //     });
  //     toastr.success('Success!', 'Event has been updated')
  //   } catch (error) {
  //     toastr.error('Oops!', 'Something went wrong')
  //   }
  // }

  // return {
  //   type: UPDATE_EVENT,
  //   payload: {
  //     event
  //   }
  // }
}

export const cancelToggle = (cancelled, eventId) =>
  async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const message = cancelled
      ? "Are you sure you want to cancel the event?"
      : "This will reactivate the event - are you sure?";
    try {
      toastr.confirm(message, {
        onOk: () =>
          // await firestore.update(`events/${eventId}`, {
          firestore.update(`events/${eventId}`, {
            cancelled: cancelled
        })
      });
    } catch (error) {
      console.log(error)
    }
  }

export const getEventsForDashboard = (lastEvent) =>
  async (dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    // const eventsQuery = firestore.collection('events').where('date', '>=', today);
    const eventsRef = firestore.collection('events');
    // console.log(eventsQuery);
    try {
      dispatch(asyncActionStart())
      let startAfter = lastEvent && await firestore.collection('events').doc(lastEvent.id).get();
      // let querySnap = await eventsQuery.get()
      let query;

      // lastEvent
      //   ? (query = eventsRef.orderBy('date').startAfter(startAfter).limit(2))
      //   : (query = eventsRef.orderBy('date').limit(2));
      lastEvent
        ? (query = eventsRef.where('date', '>=', today).orderBy('date').startAfter(startAfter).limit(2))
        : (query = eventsRef.where('date', '>=', today).orderBy('date').limit(2));

      let querySnap = await query.get();

      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish())
        return;
      }

      let events = [];

      for (let i=0; i < querySnap.docs.length; i++) {
        let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
        events.push(evt);
      }
      dispatch({type: FETCH_EVENTS, payload: {events}})
      dispatch(asyncActionFinish())
      // console.log(events);
      // console.log(querySnap)
      return querySnap;
    } catch (error) {
      console.og(error)
      dispatch(asyncActionError)
    }
  }

// export const deleteEvent = (eventId) => {
//   return {
//     type: DELETE_EVENT,
//     payload: {
//       eventId
//     }
//   }
// }

// REDUX THUNK
// export const loadEvents = () => {
//   return async dispatch => {
//     try {
//       dispatch(asyncActionStart());
//       let events = await fetchSampleData();
//       dispatch(fetchEvents(events));
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       console.log(error);
//       dispatch(asyncActionError());
//     }
//   };
// };
