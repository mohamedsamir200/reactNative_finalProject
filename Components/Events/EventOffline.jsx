// // // import React from 'react';
// // // import { View, Text } from 'react-native';

// // // function EventOffline({ route }) {
// // //   const { event } = route.params;

// // //   return (
// // //     <View>
// // //       <Text>{event.name}</Text>
// // //       <Text> {event.eventtype}</Text>
// // //     </View>
// // //   );
// // // }

// // // export default EventOffline;
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Button, Modal, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
// // import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
// // // import PayPalPayment from './Payment';

// // function EventOffline() {
// //   const route = useRoute();
// //   const event = route.params?.event || {};
// //   const startJitsiMeeting = () => {
// //     const url = 'https://meet.jit.si/yourMeetingRoom'; // استبدل برابط الاجتماع الذي تريده
// //     const userInfo = {
// //       displayName: 'User Name',  // اسم المستخدم
// //       email: 'user@example.com', // البريد الإلكتروني
// //       avatar: 'https://example.com/avatar.png', // الصورة الرمزية للمستخدم (اختياري)
// //     };

// //     JitsiMeet.call(url, userInfo); // بدء الاجتماع باستخدام JitsiMeet.call
// //   };

// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Button title="Start Jitsi Meeting" onPress={startJitsiMeeting} />
// //       {/* JitsiMeetView يمكن إضافته إذا كنت تريد عرض الاجتماع ضمن التطبيق */}
// //       {/* <JitsiMeetView onConferenceTerminated={_ => console.log('Conference Terminated')} /> */}
// //     </View>
// //   );
// // };

// //   // const ticketPrice = event.pricetacket;
// //   // const [count, setCount] = useState(1);
// //   // const [total, setTotal] = useState(ticketPrice);
// //   // const [showModal, setShowModal] = useState(false);
// //   // const [email, setEmail] = useState('');
// //   // const [emailError, setEmailError] = useState('');
// //   // const [soldOut, setSoldOut] = useState(false);
// //   // const navigation = useNavigation();
// //   // const db = getFirestore();

// //   // useEffect(() => {
// //   //   const fetchEvents = async () => {
// //   //     try {
// //   //       const querySnapshot = await getDocs(collection(db, "add event"));
// //   //       const events = querySnapshot.docs.map(doc => ({
// //   //         id: doc.id,
// //   //         ...doc.data()
// //   //       }));
// //   //       setOtherEvents(events);
// //   //     } catch (error) {
// //   //       console.error("Error fetching events:", error);
// //   //     }
// //   //   };

// //   //   fetchEvents();
// //   // }, [db]);

// //   // useEffect(() => {
// //   //   const checkSoldOut = async () => {
// //   //     if (event.id) {
// //   //       try {
// //   //         const eventDoc = doc(db, "add event", event.id);
// //   //         const docSnapshot = await getDocs(eventDoc);
// //   //         const eventData = docSnapshot.data();
// //   //         if (eventData?.ticketquantity <= 0) {
// //   //           setSoldOut(true);
// //   //         }
// //   //       } catch (error) {
// //   //         console.error("Error checking event status:", error);
// //   //       }
// //   //     }
// //   //   };

// //   //   checkSoldOut();
// //   // }, [db, event.id]);

// //   // const increaseCount = () => {
// //   //   setCount(prevCount => {
// //   //     const newCount = prevCount + 1;
// //   //     if (newCount <= event.ticketquantity) {
// //   //       setTotal(newCount * ticketPrice);
// //   //       return newCount;
// //   //     } else {
// //   //       Alert.alert("Cannot select more tickets than available.");
// //   //       return prevCount;
// //   //     }
// //   //   });
// //   // };

// //   // const decreaseCount = () => {
// //   //   setCount(prevCount => {
// //   //     const newCount = Math.max(prevCount - 1, 1);
// //   //     setTotal(newCount * ticketPrice);
// //   //     return newCount;
// //   //   });
// //   // };

// //   // const validateEmail = (email) => {
// //   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   //   return emailRegex.test(email);
// //   // };

// //   // const handleEmailSubmission = async () => {
// //   //   if (!validateEmail(email)) {
// //   //     setEmailError("Please enter a valid email.");
// //   //     return false;
// //   //   }
// //   //   try {
// //   //     await addDoc(collection(db, "sendTicket"), {
// //   //       email: email,
// //   //       eventId: event.id,
// //   //     });
// //   //     console.log("Email saved to Firestore successfully!");
// //   //     return true;
// //   //   } catch (error) {
// //   //     console.error("Error adding email to Firestore:", error);
// //   //     return false;
// //   //   }
// //   // };

// //   // const handlePayment = async () => {
// //   //   if (soldOut) {
// //   //     Alert.alert("This event is sold out.");
// //   //     return;
// //   //   }

// //   //   const emailSubmitted = await handleEmailSubmission();
// //   //   if (!emailSubmitted) return;

// //   //   console.log(`Paying ${total} with Visa`);
// //   //   setShowModal(false);
// //   // };

// //   // return (
// //   //   <View style={styles.container}>
// //       {/* <View style={styles.ticketCard}>
// //         <Image source={{ uri: event.eventImg }} style={styles.eventImage} />
// //         <Text style={styles.eventTitle}>{event.name}</Text>
// //         <Text>{event.description}</Text>
// //         <View style={styles.counter}>
// //           <Button title="-" onPress={decreaseCount} disabled={soldOut} />
// //           <Text style={styles.countText}>{count}</Text>
// //           <Button title="+" onPress={increaseCount} disabled={soldOut} />
// //         </View>
// //         <Text style={styles.totalPrice}>{soldOut ? "Sold Out" : `${total} EGP`}</Text>
// //         {/* <TouchableOpacity onPress={() => setShowModal(true)} style={styles.payButton}>
// //           <Text style={styles.payButtonText}>Pay</Text>
// //         </TouchableOpacity> */}
// //       {/* </View> */}

// //  {/* {showModal && ( */}
// //     {/* // <PayPalPayment/> */}
  
// //     // </View>
// // //   );
// // // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     justifyContent: 'center',
// //   },
// //   ticketCard: {
// //     padding: 16,
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //   },
// //   eventImage: {
// //     width: '100%',
// //     height: 200,
// //   },
// //   eventTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   counter: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginVertical: 10,
// //   },
// //   countText: {
// //     fontSize: 18,
// //   },
// //   totalPrice: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },
// //   payButton: {
// //     backgroundColor: '#007BFF',
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   payButtonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //   },
// //   modalView: {
// //     margin: 20,
// //     backgroundColor: 'white',
// //     borderRadius: 20,
// //     padding: 35,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   modalText: {
// //     marginBottom: 15,
// //     textAlign: 'center',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   input: {
// //     width: '100%',
// //     padding: 10,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginBottom: 10,
// //   },
// // });

// // export default EventOffline;

// // import React, { useEffect, useState } from 'react';
// // import { Button, View } from 'react-native';
// // import JitsiMeet, { JitsiMeetEvents } from '@jitsi/react-native-sdk';// import JitsiMeet from 'react-native-jitsi-meet';

// // const EventOffline = () => {
//   // const startMeeting = () => {
//   //   const room = 'your-room-name'; // اسم الغرفة
//   //   JitsiMeet.call(room);
//   // };
//   // const [showMeeting, setShowMeeting] = useState(false);

//   // const handleStartMeeting = () => {
//   //   const url = 'https://meet.jit.si/MyCustomRoom';
//   //   const userInfo = {
//   //     displayName: 'User Name',
//   //     email: 'user@example.com',
//   //     avatar: 'https://example.com/avatar.png',
//   //   };

//   //   setShowMeeting(true);
//   //   JitsiMeet.call(url, userInfo);
//   // };

//   // useEffect(() => {
//   //   // Cleanup function to end the call when the component is unmounted
//   //   return () => {
//   //     JitsiMeet.endCall();
//   //   };
//   // }, []);

// //   return (
// //     <View style={styles.container}>
// //          <View>
// //       <Button title="Start Meeting" onPress={startMeeting} />
// //     </View>
// //       {/* {!showMeeting ? (
// //         <Button title="Start Video Call" onPress={handleStartMeeting} color="#025048" />
// //       ) : (
// //         <View style={styles.meetingContainer} />
// //       )} */}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   meetingContainer: {
// //     height: '100%',
// //     width: '100%',
// //   },
// // });

// // export default EventOffline;
// import React, { useEffect } from 'react';
// import { Button, View } from 'react-native';
// // import JitsiMeet, { JitsiMeetEvents } from 'react-native-jitsi-meet';

// const EventOffline = () => {
//   // const startCall = () => {
//   //   const roomName = 'MyCustomRoom'; // استبدل باسم الغرفة
//   //   const userInfo = {
//   //     displayName: 'User Name', // اسم المستخدم
//   //     email: 'hanaamohammed840@gmail.com', // البريد الإلكتروني
//   //     avatar: 'https://example.com/avatar.png', // رابط الصورة
//   //   };

//   //   JitsiMeet.join(roomName, userInfo);
//   // };

//   // const endCall = () => {
//   //   JitsiMeet.endCall(); // إنهاء المكالمة
//   // };

//   // useEffect(() => {
//   //   const onConferenceTerminated = (nativeEvent) => {
//   //     console.log('Conference ended', nativeEvent);
//   //   };

//   //   const onConferenceJoined = (nativeEvent) => {
//   //     console.log('Joined conference', nativeEvent);
//   //   };

//   //   const onParticipantJoined = (nativeEvent) => {
//   //     console.log('Participant joined', nativeEvent);
//   //   };

//   //   JitsiMeet.addListener(JitsiMeetEvents.CONFERENCE_TERMINATED, onConferenceTerminated);
//   //   JitsiMeet.addListener(JitsiMeetEvents.CONFERENCE_JOINED, onConferenceJoined);
//   //   JitsiMeet.addListener(JitsiMeetEvents.PARTICIPANT_JOINED, onParticipantJoined);

//   //   // التنظيف عند مغادرة المكون
//   //   return () => {
//   //     JitsiMeet.removeListener(JitsiMeetEvents.CONFERENCE_TERMINATED, onConferenceTerminated);
//   //     JitsiMeet.removeListener(JitsiMeetEvents.CONFERENCE_JOINED, onConferenceJoined);
//   //     JitsiMeet.removeListener(JitsiMeetEvents.PARTICIPANT_JOINED, onParticipantJoined);
//   //   };
//   // }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {/* <Button title="Start Video Call" onPress={startCall} />
//       <Button title="End Video Call" onPress={endCall} /> */}
//     </View>
//   );
// };

// export default EventOffline;



// import React, { useState } from 'react';
// import { Button, View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const EventOffline = () => {
//   // const [showMeeting, setShowMeeting] = useState(false);

//   // const handleStartMeeting = () => {
//   //   setShowMeeting(true);
//   // };

//   return (
//     <View style={styles.container}>
//       {/* {!showMeeting ? (
//         <Button title="Start Video Call" onPress={handleStartMeeting} />
//       ) : (
//         <WebView
//           style={styles.webview}
//           source={{ uri: 'https://meet.jit.si/MyCustomRoom' }}
//           javaScriptEnabled={true}
//           onMessage={(event) => {
//             // يمكنك استخدام هذا لإرسال الرسائل من الويب إلى React Native إذا لزم الأمر
//             console.log(event.nativeEvent.data);
//           }}
//         />
//       )} */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   webview: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
// });

// export default EventOffline;
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const EventOffline = () => {
  const handleStartMeeting = async () => {
    const result = await WebBrowser.openBrowserAsync('https://meet.jit.si/MyCustomRoom');
    // يمكنك التعامل مع نتيجة فتح المتصفح إذا كنت بحاجة لذلك
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

export default EventOffline;
