import moment from 'moment'

// ERROR from video 169.07 - Converting objects to arrays
// - [EventDetailedSidebar.jsx]
//     {attendees && attendees.map((attendee) => (
// - [EventListItem.jsx]
//     {event.attendees && Object.values(event.attendees).map((attendee, index) => (
//       <EventListAttendee key={index} attendee={attendee}/>
export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}


export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || '/assets/user.png',
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || '/assets/user.png',
        displayName: user.displayName,
        host: true
      }
    }
  }
}