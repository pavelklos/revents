import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom'

// const SignedInMenu = ({signOut, currentUser}) => {
  const SignedInMenu = ({signOut, auth, profile}) => {
  return (
    <Menu.Item position="right">
      {/* <Image avatar spaced="right" src="/assets/user.png" /> */}
      <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
      {/* <Dropdown pointing="top left" text={currentUser}> */}
      {/* <Dropdown pointing="top left" text={auth.email}> */}
      <Dropdown pointing="top left" text={profile.displayName + ' [' + auth.providerData[0].providerId + ']'}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
