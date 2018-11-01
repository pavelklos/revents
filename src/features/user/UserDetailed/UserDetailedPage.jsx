import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import UserDetailedHeader from './UserDetailedHeader'
import UserDetailedDescription from './UserDetailedDescription'
import UserDetailedPhotos from './UserDetailedPhotos'
import UserDetailedSidebar from './UserDetailedSidebar'
import UserDetailedEvents from './UserDetailedEvents'
import { userDetailedQuery } from '../userQueries'
import LoadingComponent from '../../../app/layout/LoadingComponent'

// MOVED TO userQueries.jsx
// const query = ({auth}) => {
//   return [
//     {
//       collection: 'users',
//       doc: auth.uid,
//       subcollections: [{collection: 'photos'}],
//       storeAs: 'photos'
//     }
//   ]
// }

// const mapState = (state) => ({
//   profile: state.firebase.profile,
//   auth: state.firebase.auth,
//   photos: state.firestore.ordered.photos
// })

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.id) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
};

class UserDetailedPage extends Component {
  render() {
    // const {profile, photos} = this.props;
    const {profile, photos, auth, match, requesting} = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted={true}/>

    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 &&
        <UserDetailedPhotos photos={photos}/>}
        <UserDetailedEvents/>
      </Grid>
    );
  }
}

// export default compose(
//   connect(mapState),
//   firestoreConnect(auth => query(auth)),
// )(UserDetailedPage);

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);

// import React, { Component } from 'react';
// import { Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment } from "semantic-ui-react";

// class UserDetailedPage extends Component {

//   render() {

//     return (
//       <Grid>
//         <Grid.Column width={16}>
//           <Segment>
//             <Item.Group>
//               <Item>
//                 <Item.Image avatar size='small' src='https://randomuser.me/api/portraits/men/20.jpg' />
//                 <Item.Content verticalAlign='bottom'>
//                   <Header as='h1'>First Name</Header>
//                   <br />
//                   <Header as='h3'>Occupation</Header>
//                   <br />
//                   <Header as='h3'>27, Lives in London, UK</Header>
//                 </Item.Content>
//               </Item>
//             </Item.Group>

//           </Segment>
//         </Grid.Column>
//         <Grid.Column width={12}>
//           <Segment>
//             <Grid columns={2}>
//               <Grid.Column width={10}>
//                 <Header icon='smile' content='About Display Name' />
//                 <p>I am a: <strong>Occupation Placeholder</strong></p>
//                 <p>Originally from <strong>United Kingdom</strong></p>
//                 <p>Member Since: <strong>28th March 2018</strong></p>
//                 <p>Description of user</p>

//               </Grid.Column>
//               <Grid.Column width={6}>

//                 <Header icon='heart outline' content='Interests' />
//                 <List>
//                   <Item>
//                     <Icon name='heart' />
//                     <Item.Content>Interest 1</Item.Content>
//                   </Item>
//                   <Item>
//                     <Icon name='heart' />
//                     <Item.Content>Interest 2</Item.Content>
//                   </Item>
//                   <Item>
//                     <Icon name='heart' />
//                     <Item.Content>Interest 3</Item.Content>
//                   </Item>
//                 </List>
//               </Grid.Column>
//             </Grid>

//           </Segment>
//         </Grid.Column>
//         <Grid.Column width={4}>
//           <Segment>
//             <Button color='teal' fluid basic content='Edit Profile' />
//           </Segment>
//         </Grid.Column>

//         <Grid.Column width={12}>
//           <Segment attached>
//             <Header icon='image' content='Photos' />

//             <Image.Group size='small'>
//               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
//               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
//               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
//               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
//             </Image.Group>
//           </Segment>
//         </Grid.Column>

//         <Grid.Column width={12}>
//           <Segment attached>
//             <Header icon='calendar' content='Events' />
//             <Menu secondary pointing>
//               <Menu.Item name='All Events' active />
//               <Menu.Item name='Past Events' />
//               <Menu.Item name='Future Events' />
//               <Menu.Item name='Events Hosted' />
//             </Menu>

//             <Card.Group itemsPerRow={5}>

//               <Card>
//                 <Image src={'/assets/categoryImages/drinks.jpg'} />
//                 <Card.Content>
//                   <Card.Header textAlign='center'>
//                     Event Title
//                                     </Card.Header>
//                   <Card.Meta textAlign='center'>
//                     28th March 2018 at 10:00 PM
//                                     </Card.Meta>
//                 </Card.Content>
//               </Card>

//               <Card>
//                 <Image src={'/assets/categoryImages/drinks.jpg'} />
//                 <Card.Content>
//                   <Card.Header textAlign='center'>
//                     Event Title
//                                     </Card.Header>
//                   <Card.Meta textAlign='center'>
//                     28th March 2018 at 10:00 PM
//                                     </Card.Meta>
//                 </Card.Content>
//               </Card>

//             </Card.Group>
//           </Segment>
//         </Grid.Column>
//       </Grid>

//     );
//   }
// }

// export default UserDetailedPage;