import React from "react";
import { Segment, List, Item, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom'

const EventDetailedSidebar = ({attendees}) => {
  const isHost = false;
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
      {/* 2 People Going */}
      {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>

          {attendees && attendees.map((attendee) => (
            <Item key={attendee.id} style={{ position: "relative" }}>
            {isHost &&
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right">
              Host
            </Label>}
            {/* <Item.Image size="tiny" src="/assets/user.png" /> */}
            <Item.Image size="tiny" src={attendee.photoURL} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                {/* <a>{attendee.name}</a> */}
                {/* <a>{attendee.displayName}</a> */}
                <Link to={`/profile/${attendee.id}`}>{attendee.displayName}</Link>
              </Item.Header>
            </Item.Content>
          </Item>
          ))}

        </List>
      </Segment>
    </div>
  );
};

export default EventDetailedSidebar;
