import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

class EventForm extends Component {

  state = {
    event: emptyEvent
  }

  componentDidMount() {
    if (this.props.selectedEvent != null) {
      console.log('componentDidMount()');
      console.log('selected', this.props.selectedEvent);
      this.setState({
        event: this.props.selectedEvent
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps()');
    console.log('current: ', this.props.selectedEvent);
    console.log('next: ', nextProps.selectedEvent);
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      })
    }
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    // console.log(this.refs.title.value);
    console.log(this.state.event);
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event)
    }
  }

  onTitleChanged = (evt) => {
    this.setState({
      event: {
        title: evt.target.value
      }
    })
  }

  // Generic Method for Input
  onInputChanged = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value
    this.setState({
      event: newEvent
    })
  }

  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit} >
          <Form.Field>
            <label>Event Title</label>
            {/* <input placeholder="Event Title" /> */}
            {/* <input ref='title' placeholder="Event Title" /> */}
            {/* <input onChange={this.onTitleChanged} value={event.title} placeholder="Event Title" /> */}
            <input name='title' onChange={this.onInputChanged} value={event.title} placeholder="Event Title" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input type="date" name='date' onChange={this.onInputChanged} value={event.date} placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='city' onChange={this.onInputChanged} value={event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='venue' onChange={this.onInputChanged} value={event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' onChange={this.onInputChanged} value={event.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={handleCancel} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
