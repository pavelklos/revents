import React, { Component } from "react";
import { connect } from "react-redux";
// import GoogleMapReact from 'google-map-react';
// import { Button, Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { incrementCounter, decrementCounter } from './testActions'
import { incrementAsync, decrementAsync } from './testActions'
import { openModal } from '../modals/modalActions'

const mapState = (state) => ({
  data: state.test.data, // test = testReducer, test.data = 42
  loading: state.test.loading
})

const actions = {
  // incrementCounter,
  // decrementCounter,
  incrementAsync,
  decrementAsync,
  openModal
}

// const Marker = () => <Icon name='marker' size='big' color='red' />

class TestComponent extends Component {

  static defaultProps = {
    center: {
      lat: 50.1416986,
      lng: 14.106746499999986
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({scriptLoaded: true})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  onChange = (address) => this.setState({address})

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    // const {incrementCounter, decrementCounter, data, openModal} = this.props;
    const {incrementAsync, decrementAsync, data, openModal, loading} = this.props;

    return (
      <div>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBAzzfs6OFNghMOnEGAJv4itMYv7F_Em8g&libraries=places'
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        {/* <h3>testReducer.data: {this.props.data}</h3> */}
        <h3>testReducer.data: {data}</h3>
        {/* <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' /> */}
        <Button loading={loading} onClick={incrementAsync} color='green' content='Increment' />
        <Button loading={loading} onClick={decrementAsync} color='red' content='Decrement' />
        <Button onClick={() => openModal('TestModal', {data: 43})} color='teal' content='Open Modal' />
        <br/><br/>

        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&
            <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>

        {/* <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBAzzfs6OFNghMOnEGAJv4itMYv7F_Em8g' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={50.1416986}
              lng={14.106746499999986}
              text={'Kladno'}
            />
          </GoogleMapReact>
        </div> */}

      </div>
    );
    
  }
}

export default connect(mapState, actions)(TestComponent);
