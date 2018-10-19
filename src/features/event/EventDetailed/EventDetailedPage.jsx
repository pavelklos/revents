// STATELESS FUNCTIONAL COMPONENT - snippet RFC
import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

const mapState = (state, ownProps) => {
  // PROPS - match: { params: { id: "1" } }
  // PROPS - match: { path: "/event/:id" }
  // PROPS - match: { url: "/event/1" }
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetailedPage);

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
