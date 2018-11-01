// STATELESS FUNCTIONAL COMPONENT - snippet RFC
import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from 'react-redux-firebase'
// import { toastr } from 'react-redux-toastr'
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { objectToArray } from '../../../app/common/util/helpers'
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions'

// PROPS - match: { params: { id: "1" } }
// PROPS - match: { path: "/event/:id" }
// PROPS - match: { url: "/event/1" }
// const mapState = (state, ownProps) => {
const mapState = (state) => {
  
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
    event,
    auth: state.firebase.auth
  };

  // const eventId = ownProps.match.params.id;
  // let event = {};
  // if (eventId && state.events.length > 0) {
  //   event = state.events.filter(event => event.id === eventId)[0];
  // }
  // return {
  //   event
  // };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
}

class EventDetailedPage extends Component {

  async componentDidMount() {
    const {firestore, match} = this.props;
    // const {firestore, match, history} = this.props;
    // let event = await firestore.get(`events/${match.params.id}`);
    await firestore.setListener(`events/${match.params.id}`);

    // console.log(event);
    // if (!event.exists) {
    //   history.push('/events');
    //   toastr.error('Sorry', 'Event not found')
    // }
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event, auth, goingToEvent, cancelGoingToEvent} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    // if (event && event.attendees) { console.log(event.attendees); }
    // console.log(attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    
    return (
    <Grid>
      <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <EventDetailedSidebar attendees={event.attendees} /> */}
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
    )
  }
}

// const EventDetailedPage = ({event}) => {
//   return (
//     <Grid>
//       <Grid.Column width={10}>
//         <EventDetailedHeader event={event} />
//         <EventDetailedInfo event={event} />
//         <EventDetailedChat />
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <EventDetailedSidebar attendees={event.attendees} />
//       </Grid.Column>
//     </Grid>
//   );
// };

// export default connect(mapState)(EventDetailedPage);
export default withFirestore(connect(mapState, actions)(EventDetailedPage));

// const event = {
//   id: "1",
//   title: "Trip to Tower of London",
//   // date: "2018-03-27T11:00:00+00:00",
//   date: "2018-03-27",
//   category: "culture",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
//   city: "London, UK",
//   venue: "Tower of London, St Katharine's & Wapping, London",
//   hostedBy: "Bob",
//   hostPhotoURL: "https://randomuser.me/api/portraits/men/30.jpg",
//   attendees: [
//     {
//       id: "a",
//       name: "Edgar",
//       photoURL: "https://randomuser.me/api/portraits/men/31.jpg"
//     },
//     {
//       id: "b",
//       name: "Tom",
//       photoURL: "https://randomuser.me/api/portraits/men/32.jpg"
//     },
//     {
//       id: "c",
//       name: "Steve",
//       photoURL: "https://randomuser.me/api/portraits/men/33.jpg"
//     }
//   ]
// };
