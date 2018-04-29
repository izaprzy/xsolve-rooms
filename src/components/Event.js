import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Body, Text } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
  },
});

class Event extends Component {
  renderMeetingTimeframe() {
    const { start, end } = this.props.item;
    if (start) {
      return <Text note>{start} - {end}</Text>;
    }
    return <View />;
  }

  renderRoomName() {
    if (this.props.showRoomName) {
      return <Text style={styles.titleText}>{this.props.item.location}</Text>
    }
    return <View/>
  }

  render() {
    const { summary } = this.props.item;
    return (
      <ListItem>
        <Body>
          {this.renderRoomName()}
          <Text>{summary}</Text>
          {this.renderMeetingTimeframe()}
        </Body>
      </ListItem>
    );
  }
}

Event.propTypes = {
  item: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    summary: PropTypes.string.isRequired,
  }),
};

Event.defaultProps = {
  item: {
    start: '',
    end: '',
  },
};

export default Event;
