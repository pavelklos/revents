import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      // <div className='App'>
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route path='/(.+)' render={() => (
          
          <div>
            <NavBar />
            <Container className="main">
              <Switch>
                {/* <EventDashboard /> */}
                <Route path='/events' component={EventDashboard} />
                <Route path='/event/:id' component={EventDetailedPage} />
                <Route path='/manage/:id' component={EventForm} />
                <Route path='/people' component={PeopleDashboard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashboard} />
                <Route path='/createEvent' component={EventForm} />
                <Route path='/test' component={TestComponent} />
              </Switch>
            </Container>

            {/* <h1>Re-vents</h1> */}
            {/* <button className="ui icon button">
              <i className="smile icon"></i>
              CSS Button
            </button>
            <div className="ui button">Pavel Klos, Ústecká 3052, Kladno, 27201</div>
            <Button icon="smile" content="React Button" /> */}
          </div>
        )} />

        
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
