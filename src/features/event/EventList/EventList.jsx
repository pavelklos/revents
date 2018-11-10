import React, { Component } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";

class EventList extends Component {
  render() {
    // const { events, onEventOpen, deleteEvent } = this.props;
    // const { events, deleteEvent } = this.props;
    const { events, getNextEvents, loading, moreEvents } = this.props;
    return (
      <div>
        {/* <h1>Event List</h1> */}
        {/* {events.map((event) => ( */}

        {events && events.length !== 0 &&
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events && events.map(event => (
              <EventListItem
                key={event.id}
                event={event}
                // onEventOpen={onEventOpen}
                // deleteEvent={deleteEvent}
              />
            ))}
          </InfiniteScroll>
        }

        {/* {events && events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            // onEventOpen={onEventOpen}
            deleteEvent={deleteEvent}
          />
        ))} */}
      </div>
    );
  }
}

export default EventList;
