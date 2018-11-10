import React from 'react';
// import { Card, Grid, Header, Image, Menu, Segment, Tab } from 'semantic-ui-react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

const panes = [
  {menuItem: 'All Events', pane: {key: 'allEvents'}},
  {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
  {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
  {menuItem: 'Hosting', pane: {key: 'hosted'}},
]

const UserDeteiledEvents = ({events, eventsLoading, changeTab}) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Events" />

        <Tab onTabChange={(e, data) => changeTab(e, data)} panes={panes} menu={{secondary: true, pointing: true}} />
        <br/>

        {/* <Menu secondary pointing>
          <Menu.Item name="All Events" active />
          <Menu.Item name="Past Events" />
          <Menu.Item name="Future Events" />
          <Menu.Item name="Events Hosted" />
        </Menu> */}

        <Card.Group itemsPerRow={5}>

          {events && events.map((event) => (
            <Card as={Link} to={`/event/${event.id}`} key={event.id}>
              {/* <Image src={'/assets/categoryImages/drinks.jpg'} /> */}
              <Image src={`/assets/categoryImages/${event.category}.jpg`} />
              <Card.Content>
                {/* <Card.Header textAlign="center">Event Title</Card.Header>
                <Card.Meta textAlign="center">28th March 2018 at 10:00 PM</Card.Meta> */}
                <Card.Header textAlign="center">{event.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                  <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}

          {/* <Card>
            <Image src={'/assets/categoryImages/drinks.jpg'} />
            <Card.Content>
              <Card.Header textAlign="center">Event Title</Card.Header>
              <Card.Meta textAlign="center">
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card> */}

        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDeteiledEvents;
