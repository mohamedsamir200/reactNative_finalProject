import React from 'react';
import { View, Text } from 'react-native';

export default function EventOffline({ route }) {
  const { event } = route.params;

  return (
    <View>
      <Text>{event.name}</Text>
      <Text> {event.eventtype}</Text>
    </View>
  );
}

