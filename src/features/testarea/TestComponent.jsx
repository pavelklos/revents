import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import { incrementCounter, decrementCounter } from './testActions'

const mapState = (state) => ({
  data: state.test.data, // test = testReducer, test.data = 42
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {
  render() {

    const {incrementCounter, decrementCounter, data} = this.props;

    return (
      <div>
        <h1>Test Area</h1>
        {/* <h3>testReducer.data: {this.props.data}</h3> */}
        <h3>testReducer.data: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
