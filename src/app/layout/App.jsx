import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
// import { Button } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar'
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      // <div className='App'>
      <div>

        <NavBar />
        <Container className="main">
          <EventDashboard />
        </Container>
        
        {/* <h1>Re-vents</h1> */}
        {/* <button className="ui icon button">
          <i className="smile icon"></i>
          CSS Button
        </button>
        <div className="ui button">Pavel Klos, Ústecká 3052, Kladno, 27201</div>
        <Button icon="smile" content="React Button" /> */}

      </div>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2 className="App-title">Welcome to Re-vents!</h2>
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
