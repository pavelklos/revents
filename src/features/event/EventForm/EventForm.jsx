/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
// import moment from 'moment'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
// import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

// const emptyEvent = {
//   title: '',
//   date: '',
//   city: '',
//   venue: '',
//   hostedBy: ''
// }

// const mapState = (state, ownProps) => {
  const mapState = (state) => {

    let event = {};
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
      event = state.firestore.ordered.events[0]
    }
    return {
      initialValues: event,
      event
    };

  // const eventId = ownProps.match.params.id;
  // let event = {};
  // if (eventId && state.events.length > 0) {
  //   event = state.events.filter(event => event.id === eventId)[0]
  // }
  // return {
  //   initialValues: event
  // }

  // let event = {
  //   title: '',
  //   date: '',
  //   city: '',
  //   venue: '',
  //   hostedBy: ''
  // }
}

const actions = { createEvent, updateEvent, cancelToggle }

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {

  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const {firestore, match} = this.props;
    // let event = await firestore.get(`events/${match.params.id}`);
    await firestore.setListener(`events/${match.params.id}`);
    // if (event.exists) {
    //   this.setState({
    //     venueLatLng: event.data().venueLatLng
    //   })
    // }
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  }

  // state = {
  //   // event: emptyEvent
  //   event: Object.assign({}, this.props.event)
  // }

  // componentDidMount() {
  //   if (this.props.selectedEvent != null) {
  //     console.log('componentDidMount()');
  //     console.log('selected', this.props.selectedEvent);
  //     this.setState({
  //       event: this.props.selectedEvent
  //     })
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps()');
  //   console.log('current: ', this.props.selectedEvent);
  //   console.log('next: ', nextProps.selectedEvent);
  //   if (nextProps.selectedEvent !== this.props.selectedEvent) {
  //     this.setState({
  //       event: nextProps.selectedEvent || emptyEvent
  //     })
  //   }
  // }

  onFormSubmit = values => {
    // values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {

      if(Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }

      this.props.updateEvent(values);
      this.props.history.goBack()
    } else {
      console.log(values);
      this.props.createEvent(values);
      this.props.history.push('/events')
    }
  }

  // onFormSubmit = (values) => {
  //   console.log(values);

  //   values.date = moment(values.date).format();
  //   values.venueLatLng = this.state.venueLatLng;
  //   if (this.props.initialValues.id) {
  //     this.props.updateEvent(values);
  //     this.props.history.goBack()
  //   } else {
  //     // REDUX - we need id, hostPhotoURL
  //     const newEvent = {
  //       ...values,
  //       id: cuid(),
  //       hostPhotoURL: '/assets/user.png',
  //       hostedBy: 'Bob'
  //     }
  //     this.props.createEvent(newEvent);
  //     this.props.history.push('/events')
  //     // this.props.createEvent(this.state.event)
  //   }
  // }

  // onFormSubmit = (evt) => {
  //   evt.preventDefault();
  //   // console.log(this.refs.title.value);
  //   console.log(this.state.event);
  //   if (this.state.event.id) {
  //     this.props.updateEvent(this.state.event);
  //     this.props.history.goBack()
  //   } else {
  //     // REDUX - we need id, hostPhotoURL
  //     const newEvent = {
  //       ...this.state.event,
  //       id: cuid(),
  //       hostPhotoURL: '/assets/user.png'
  //     }
  //     this.props.createEvent(newEvent);
  //     this.props.history.push('/events')
  //     // this.props.createEvent(this.state.event)
  //   }
  // }

  onTitleChanged = (evt) => {
    this.setState({
      event: {
        title: evt.target.value
      }
    })
  }

  // Generic Method for Input
  // onInputChanged = (evt) => {
  //   const newEvent = this.state.event;
  //   newEvent[evt.target.name] = evt.target.value
  //   this.setState({
  //     event: newEvent
  //   })
  // }

  render() {
    // const {handleCancel} = this.props;
    // const {event} = this.state;
    const {invalid, submitting, pristine, event, cancelToggle} = this.props;
    return (
      <Grid>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBAzzfs6OFNghMOnEGAJv4itMYv7F_Em8g&libraries=places'
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            {/* <Form onSubmit={this.onFormSubmit} > */}
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} >

              {/* REDUX-FORM Field */}
              {/* <Field name='title' type='text' component='input' placeholder='Event Title' /> */}
              <Field name='title' type='text' component={TextInput} placeholder='Give your event a name' />
              <Field name='category' type='text' options={category} component={SelectInput} placeholder='What is your event about' />
              <Field name='description' type='text' rows={3} component={TextArea} placeholder='Tell us about your event' />
              
              <Header sub color='teal' content='Event Location Details' />
              {/* <Field name='city' type='text' component={TextInput} placeholder='Event City' /> */}
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder='Event City'
              />
              {/* <Field name='venue' type='text' component={TextInput} placeholder='Event Venue' /> */}
              {this.state.scriptLoaded &&
              <Field
                name='venue'
                type='text'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder='Event Venue'
                onSelect={this.handleVenueSelect}
              />}
              {/* <Field name='date' type='text' component={TextInput} placeholder='Event Date' /> */}
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Date and Time of event'
              />
              {/* <Form.Field> */}
                {/* <label>Event Title</label> */}
                {/* <input placeholder="Event Title" /> */}
                {/* <input ref='title' placeholder="Event Title" /> */}
                {/* <input onChange={this.onTitleChanged} value={event.title} placeholder="Event Title" /> */}
                {/* <input name='title' onChange={this.onInputChanged} value={event.title} placeholder="Event Title" /> */}
              {/* </Form.Field> */}
              {/* <Form.Field>
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
              </Form.Field> */}
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              {/* <Button onClick={handleCancel} type="button">Cancel</Button> */}
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>

              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />

            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
      
    );
  }
}

// export default connect(mapState, actions)(
//   reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm)
// );
export default withFirestore(connect(mapState, actions)(
  reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm))
);
