import React, { Component } from "react";
import { connect } from 'react-redux'
// import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { firestoreConnect } from 'react-redux-firebase'
// import { Grid, Button } from "semantic-ui-react";
// import { Grid, Button } from "semantic-ui-react";
import { Grid, Loader } from "semantic-ui-react";
// import cuid from 'cuid';
import EventList from "../EventList/EventList";
// import EventForm from "../EventForm/EventForm";
// import { createEvent, updateEvent, deleteEvent } from '../eventActions'
// import { deleteEvent } from '../eventActions'
import { getEventsForDashboard } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'

// REDUX
const mapState = (state) => ({
  // events: state.events,
  // events: state.firestore.ordered.events,
  // loading: state.async.loading
  // events: []
  events: state.events,
  loading: state.async.loading
})

const actions = {
  // createEvent,
  // updateEvent,
  // deleteEvent
  getEventsForDashboard
}

class EventDashboard extends Component {
state = {
  moreEvents: false,
  loadingInitial: true,
  loadedEvents: []
}

async componentDidMount() {
let next = await this.props.getEventsForDashboard();
  console.log(next);

  if (next && next.docs && next.docs.length > 1) {
    this.setState({
      moreEvents: true,
      loadingInitial: false,
    })
  }
}

componentWillReceiveProps(nextProps) {
  if (this.props.events !== nextProps.events) {
    this.setState({
      loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
    })
  }
}

getNextEvents = async () => {
  const {events} = this.props;
  let lastEvent = events && events[events.length -1];
  console.log(lastEvent);
  let next = await this.props.getEventsForDashboard(lastEvent);
  console.log(next);

  if (next && next.docs && next.docs.length <= 1) {
    this.setState({
      moreEvents: false
    })
  }
}

  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     events: eventsDashboard,
  //     isOpen: false
  //   }

  //   this.handleFormOpen = this.handleFormOpen.bind(this);
  //   this.handleCancel = this.handleCancel.bind(this);
  // }

  // handleFormOpen = (thing) => {
  //   console.log(thing)
  // }

  // state = {
  //   // events: eventsDashboard,
  //   isOpen: false,
  //   selectedEvent: null
  // }

  // Crud = CREATE
  // handleFormOpen = () => {
  //   this.setState({
  //     selectedEvent: null,
  //     isOpen: true
  //   })
  // }

  // handleCancel = () => {
  //   this.setState({
  //     isOpen: false
  //   })
  // }

  // Crud = CREATE (after submit)
  // handleCreateEvent = (newEvent) => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = '/assets/user.png';

  //   // REDUX
  //   this.props.createEvent(newEvent);

  //   // const updatedEvents = [...this.state.events, newEvent];
  //   this.setState({
  //     // events: updatedEvents,
  //     isOpen: false
  //   })
  // }

  // cRud = READ
  // handleOpenEvent = (eventToOpen) => () => {
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   })
  // }

  // crUd = UPDATE
  // handleUpdateEvent = (updatedEvent) => {

  //   // REDUX
  //   this.props.updateEvent(updatedEvent);

  //   this.setState({
  //     // events: this.state.events.map(event => {
  //     //   if (event.id === updatedEvent.id) {
  //     //     return Object.assign({}, updatedEvent);
  //     //   } else {
  //     //     return event
  //     //   }
  //     // }),
  //     isOpen: false,
  //     selectedEvent: null
  //   })
  // }

  // cruD = DELETE
  // handleDeleteEvent = (eventId) => () => {
  //   // const updatedEvents = this.state.events.filter(e => e.id !== eventId);
  //   // this.setState({
  //   //   events: updatedEvents
  //   // })

  //   // REDUX
  //   this.props.deleteEvent(eventId);
  // }

  render() {
    // const {selectedEvent} = this.state;
    // const {events, loading} = this.props; // REDUX
    // if (loading) return <LoadingComponent inverted={true} />
    // const {events, loading} = this.props; // REDUX
    const {loading} = this.props; // REDUX
    const {moreEvents, loadedEvents} = this.state;
    // if (!isLoaded(events|| isEmpty(events))) return <LoadingComponent inverted={true} />
    // if (loading) return <LoadingComponent inverted={true} />
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        
        <Grid.Column width={10}>
          {/* <h2>Left Column</h2> */}
          {/* <EventList events={eventsDashboard} /> */}
          <EventList
            // deleteEvent={this.handleDeleteEvent}
            // onEventOpen={this.handleOpenEvent}
            // events={this.state.events}
            // events={events} // REDUX
            loading={loading}
            moreEvents={moreEvents}
            // events={this.state.loadedEvents} // REDUX
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
          />
          {/* <Button loading={loading} onClick={this.getNextEvents} diasabled={!this.state.moreEvents} content='More' color='green' floated='right'/> */}
        </Grid.Column>
        
        <Grid.Column width={6}>
          <EventActivity/>
          {/* <h2>Right Column</h2> */}
          {/* <Button onClick={this.handleFormOpen.bind(this)} positive content="Create Event" /> */}
          {/* <Button onClick={() => this.handleFormOpen()} positive content="Create Event" /> */}
          {/* <Button onClick={() => this.handleFormOpen('a string')} positive content="Create Event" /> */}
          {/* <Button onClick={this.handleFormOpen} positive content="Create Event" />
          
          {this.state.isOpen && ( 
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )} */}
        </Grid.Column>

        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

// export default EventDashboard;
// REDUX
export default connect(mapState, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard));

// const eventsDashboard = [
//   {
//     id: "1",
//     title: "Trip to Tower of London",
//     // date: "2018-03-27T11:00:00+00:00",
//     date: "2018-03-27",
//     category: "culture",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
//     city: "London, UK",
//     venue: "Tower of London, St Katharine's & Wapping, London",
//     hostedBy: "Bob",
//     hostPhotoURL: "https://randomuser.me/api/portraits/men/30.jpg",
//     attendees: [
//       {
//         id: "a",
//         name: "Edgar",
//         photoURL: "https://randomuser.me/api/portraits/men/31.jpg"
//       },
//       {
//         id: "b",
//         name: "Tom",
//         photoURL: "https://randomuser.me/api/portraits/men/32.jpg"
//       },
//       {
//         id: "c",
//         name: "Steve",
//         photoURL: "https://randomuser.me/api/portraits/men/33.jpg"
//       }
//     ]
//   },
//   {
//     id: "2",
//     title: "Trip to Punch and Judy Pub",
//     // date: "2018-03-28T14:00:00+00:00",
//     date: "2018-03-28",
//     category: "drinks",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
//     city: "London, UK",
//     venue: "Punch & Judy, Henrietta Street, London, UK",
//     hostedBy: "Dale",
//     hostPhotoURL: "https://randomuser.me/api/portraits/men/40.jpg",
//     attendees: [
//       {
//         id: "d",
//         name: "Gabriel",
//         photoURL: "https://randomuser.me/api/portraits/men/41.jpg"
//       },
//       {
//         id: "e",
//         name: "Harry",
//         photoURL: "https://randomuser.me/api/portraits/men/42.jpg"
//       }
//     ]
//   }
// ];
