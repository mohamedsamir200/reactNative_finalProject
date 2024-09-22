import React from 'react';
import { View, Text } from 'react-native';

function EventOnline({ route }) {
  const { event } = route.params;

  return (
    <View>
      <Text>{event.name}</Text>
      <Text> {event.eventtype}</Text>
    </View>
  );
}

export default EventOnline;
