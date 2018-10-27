import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";
import { openModal } from '../../modals/modalActions'
// import { logout } from '../../auth/authActions'

const actions = {
  openModal,
  // logout
}

const mapState = (state) => ({
  // auth: state.auth
  auth: state.firebase.auth,
  profile: state.firebase.profile,
})

class NavBar extends Component {

  // state = {
  //   authenticated: false
  // }

  handleSignIn = () => {
    this.props.openModal('LoginModal')
    // this.setState({
    //   authenticated: true
    // })
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    // this.props.logout();
    // this.setState({
    //   authenticated: false
    // });
    this.props.history.push('/');
  }

  render() {
    const {auth, profile} = this.props;
    // const authenticated = auth.authenticated;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    // const {authenticated} = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to='/' header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to='/test' name="Test" />
          {/* <Menu.Item name="Events" /> */}
          <Menu.Item as={NavLink} to='/events' name="Events" />
          {authenticated &&
            <Menu.Item as={NavLink} to='/people' name="People" />
          }
          {authenticated &&
            <Menu.Item>
              <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
            </Menu.Item>
          }
          {/* <Menu.Item position="right">
            <Button basic inverted content="Login" />
            <Button basic inverted content="Sign Out" style={{ marginLeft: "0.5em" }} />
          </Menu.Item> */}
          {authenticated
            // ? <SignedInMenu currentUser={auth.currentUser} signOut={this.handleSignOut} />
            ? <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
            : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
          }
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
