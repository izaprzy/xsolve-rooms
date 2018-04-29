import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Event from '../../components/Event';
import { getRoomEventsById } from '../../redux/events';
import events from "../../redux/events";

class Dashboard extends Component {
  static navigationOptions() {
    return {
      title: 'Dashboard',
    };
  }

  componentWillMount() {
    this.props.getRoomEventsById('primary');
  }

  render() {
    const allRoomsIds = this.props.allRooms.map( room => room.resourceEmail)

    const roomEvents = this.props.events.filter( event => event.attendees
      .find( attendee => allRoomsIds.includes(attendee.email)))

    return (
      <FlatList
        data={roomEvents}
        keyExtractor={item => item.start + item.summary}
        renderItem={({ item }) => (
          <Event
            showRoomName={true}
            item={item}
          />
        )}
      />
    );
  }
}

Dashboard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string,
  })),
  getRoomEventsById: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  events: [],
};

const mapStateToProps = (state) => {
  const events = state.events.data.primary;
  const allRooms = state.rooms.data.filter(t => t.buildingId.includes(state.context))

  return { events, allRooms };
};

export default connect(mapStateToProps, { getRoomEventsById })(Dashboard);


