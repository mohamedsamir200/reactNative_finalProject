import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const onlineRoom = () => {
  const handleStartMeeting = async () => {
    const result = await WebBrowser.openBrowserAsync('https://meet.jit.si/MyCustomRoom');
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Start Video Call" onPress={handleStartMeeting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default onlineRoom;