



import React from 'react';
import { Button, View, StyleSheet, Image, Text} from 'react-native';
import * as WebBrowser from 'expo-web-browser';




const OnlineRoom = ({route}) => {
  const { event } = route.params || {};
  const handleStartMeeting = async () => {
    const result = await WebBrowser.openBrowserAsync('https://meet.jit.si/MyCustomRoom');
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <Image
          style={{
            resizeMode: 'cover',
            height: 350,
            width: 350,
          }}
          source={require('../../assets/images/onlinevent.png')}
        />

      {/* <Button title="Start Video Call"  /> */}
      <View><Text onPress={handleStartMeeting} style={styles.btn}>Start Your Journy</Text></View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#def7e5'
  },
  btn:{ 
    backgroundColor: '#92e3a9',
    textAlign: 'center',
    width: 150,
    padding: 13,
    margin: 'auto',
    borderRadius: 30
  }
});

export default OnlineRoom;