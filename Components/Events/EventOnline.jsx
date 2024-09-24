import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import paypalApi from '../payment/paypalApi';
import queryString from 'query-string';

function EventOnline({ route }) {
  const { event } = route.params;
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const fetchCardDetail = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const Payment = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token);
      setAccessToken(token);
      setLoading(false);
      
      if (res?.links) {
        const findUrl = res.links.find(data => data?.rel === "approve");
        if (findUrl) {
          setPaypalUrl(findUrl.href);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState) => {
    console.log("webviewState:", webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const { token } = urlValues.query;
      if (token) {
        paymentSuccess(token);
      }
    }
  };
  const capturePayment = async (orderId) => {
    try {
        const captureResponse = await paypalApi.capturePayment(orderId, accessToken);
        console.log("Payment captured:", captureResponse);
    } catch (error) {
        console.error("Error capturing payment:", error);
    }
};
  const paymentSuccess = async (id) => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      console.log("capturePayment res:", res);
      Alert.alert("Payment successful!");
      clearPaypalState();
    } catch (error) {
      console.log("Error raised in payment capture:", error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventType}>{event.eventtype}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Button onPress={Payment} title="Pay" color="red" />
      
    </View>
  );
}

export default EventOnline;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventType: {
    fontSize: 18,
    marginVertical: 10,
  },
});



// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Button, Alert } from 'react-native';
// import paypalApi from '../payment/paypalApi';
// import queryString from 'query-string';
// import WebView from 'react-native-webview';
// import { CardField } from '@stripe/stripe-react-native';

// function EventOnline({ route }) {
//   const { event } = route.params;
//   const [cardInfo, setCardInfo] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const [paypalUrl, setPaypalUrl] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

//   const fetchCardDetail = (cardDetail) => {
//     if (cardDetail.complete) {
//       setCardInfo(cardDetail);
//     } else {
//       setCardInfo(null);
//     }
//   };

//   const Payment = async () => {
//     setLoading(true);
//     try {
//       const token = await paypalApi.generateToken();
//       const res = await paypalApi.createOrder(token);
//       setAccessToken(token);
//       setLoading(false);
      
//       if (res?.links) {
//         const findUrl = res.links.find(data => data?.rel === "approve");
//         if (findUrl) {
//           setPaypalUrl(findUrl.href);
//         }
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       setLoading(false);
//     }
//   };

//   const onUrlChange = (webviewState) => {
//     console.log("webviewState:", webviewState);
//     if (webviewState.url.includes('https://example.com/cancel')) {
//       clearPaypalState();
//       return;
//     }
//     if (webviewState.url.includes('https://example.com/return')) {
//       const urlValues = queryString.parseUrl(webviewState.url);
//       const { token } = urlValues.query;
//       if (token) {
//         paymentSuccess(token);
//       }
//     }
//   };
//   const capturePayment = async (orderId) => {
//     try {
//         const captureResponse = await paypalApi.capturePayment(orderId, accessToken);
//         console.log("Payment captured:", captureResponse);
//     } catch (error) {
//         console.error("Error capturing payment:", error);
//     }
// };
//   const paymentSuccess = async (id) => {
//     try {
//       const res = await paypalApi.capturePayment(id, accessToken);
//       console.log("capturePayment res:", res);
//       Alert.alert("Payment successful!");
//       clearPaypalState();
//     } catch (error) {
//       console.log("Error raised in payment capture:", error);
//     }
//   };

//   const clearPaypalState = () => {
//     setPaypalUrl(null);
//     setAccessToken(null);
//   };

//   return (

//       <View style={styles.container}>
//             <SafeAreaView style={{ flex: 1 }}>
//                 <View style={{ padding: 16 }}>
//                     <CardField
//                         postalCodeEnabled={false}
//                         placeholders={{
//                             number: '4242 4242 4242 4242',
//                         }}

//                         cardStyle={{
//                             backgroundColor: '#FFFFFF',
//                             textColor: '#000000',
//                         }}
//                         style={{
//                             width: '100%',
//                             height: 50,
//                             marginVertical: 30,
//                         }}
//                         onCardChange={(cardDetails) => {
//                             fetchCardDetail(cardDetails)
//                         }}
//                         onFocus={(focusedField) => {
//                             console.log('focusField', focusedField);
//                         }}

//                     />

//                     <Button
//                         onPress={onDone}
//                         disabled={!cardInfo}
//                     />

//                     <Button
//                         onPress={Payment}
//                         disabled={false}
//                         btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
//                         text="PayPal"
//                         isLoading={isLoading}
//                     />

//                     <Modal
//                         visible={!!paypalUrl}
//                     >
//                         <TouchableOpacity
//                             onPress={clearPaypalState}
//                             style={{ margin: 24 }}
//                         >
//                             <Text >Closed</Text>
//                         </TouchableOpacity>
//                         <View style={{ flex: 1 }}>
//                             <WebView
//                                 source={{ uri: paypalUrl }}
//                                 onNavigationStateChange={onUrlChange}

//                             />
//                         </View>

//                     </Modal>

//                 </View>
//             </SafeAreaView>
//         </View>

//   );
// }

// export default EventOnline;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   eventName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   eventType: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
// });
