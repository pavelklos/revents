import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";

const eventsDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27T11:00:00+00:00",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/30.jpg",
    attendees: [
      {
        id: "a",
        name: "Edgar",
        photoURL: "https://randomuser.me/api/portraits/men/31.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "c",
        name: "Steve",
        photoURL: "https://randomuser.me/api/portraits/men/33.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28T14:00:00+00:00",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Dale",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/40.jpg",
    attendees: [
      {
        id: "d",
        name: "Gabriel",
        photoURL: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      {
        id: "e",
        name: "Harry",
        photoURL: "https://randomuser.me/api/portraits/men/42.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {

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

  state = {
    events: eventsDashboard,
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          {/* <h2>Left Column</h2> */}
          {/* <EventList events={eventsDashboard} /> */}
          <EventList events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          {/* <h2>Right Column</h2> */}
          {/* <Button onClick={this.handleFormOpen.bind(this)} positive content="Create Event" /> */}
          {/* <Button onClick={() => this.handleFormOpen()} positive content="Create Event" /> */}
          {/* <Button onClick={() => this.handleFormOpen('a string')} positive content="Create Event" /> */}
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          
          {this.state.isOpen &&  
          <EventForm handleCancel={this.handleCancel} />}
        
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
