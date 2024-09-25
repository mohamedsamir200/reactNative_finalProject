// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Button, Alert } from 'react-native';
// import paypalApi from '../payment/paypalApi';
// import queryString from 'query-string';

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
//     <View style={styles.container}>
//       <Text style={styles.eventName}>{event.name}</Text>
//       <Text style={styles.eventType}>{event.eventtype}</Text>
//       <Text style={styles.description}>{event.description}</Text>
//       <Button onPress={Payment} title="Pay" color="red" />
      
//     </View>
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



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Button, Alert, SafeAreaView, Text, Image, TextInput } from 'react-native';
// import * as WebBrowser from 'expo-web-browser'; 
// import paypalApi from '../payment/paypalApi';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Card } from 'react-native-paper';
// import db from '../../Config/firebase'; 
// import emailjs from '@emailjs/react-native';
// import { getFirestore, collection, getDoc,getDocs, doc  ,query, where} from "firebase/firestore";


// function EventOnline({ route }) {
//   const { event } = route.params; 
//   const [accessToken, setAccessToken] = useState(null);
//   const [organizerName, setOrganizerName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [ticketImageUrl, setTicketImageUrl] = useState('');
//   const [emailSent, setEmailSent] = useState(false);
//   const eventId = event.id; // Assuming event.id is the eventId

//   // جلب بيانات المنظم
//   const fetchOrganizer = async (organizer) => {
//     try {
//       const organizerDoc = await db.collection('users').doc(organizer).get(); 
//       if (organizerDoc.exists) {
//         const organizerData = organizerDoc.data();
//         const fullName = `${organizerData.firstname} ${organizerData.lastname}`; 
//         setOrganizerName(fullName); 
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.log('Error fetching organizer:', error);
//     }
//   };

//   useEffect(() => {
//     if (event.organizer) {
//       fetchOrganizer(event.organizer); 
//     }
//   }, [event.organizer]);

//   // جلب صورة التذكرة وإرسال البريد الإلكتروني
//   useEffect(() => {
//     if (eventId) {
//       const ticketDocRef = doc(db, "add event", eventId);
//       getDoc(ticketDocRef)
//         .then((docSnap) => {
//           if (docSnap.exists()) {
//             const ticketImg = docSnap.data().ticketImg;
//             setTicketImageUrl(ticketImg);
//           } else {
//             console.error("No such document!");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching ticket image URL: ", error);
//         });

//       const emailQuery = query(
//         collection(db, "sendTicket"),
//         where("eventId", "==", eventId)
//       );
//       getDocs(emailQuery)
//         .then((querySnapshot) => {
//           if (!querySnapshot.empty) {
//             const userDoc = querySnapshot.docs[0];
//             setUserEmail(userDoc.data().email);
//           } else {
//             console.error("No email found for this event.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching email from Firestore:", error);
//         });
//     }
//   }, [eventId]);

//   // دالة الدفع
//   const Payment = async () => {
//     if (!userEmail) {
//       Alert.alert('Error', 'Please enter your email before proceeding.');
//       return;
//     }

//     try {
//       const token = await paypalApi.generateToken();
//       const res = await paypalApi.createOrder(token, event.name, event.pricetTcket);  
//       setAccessToken(token);
      
//       if (res?.links) {
//         const findUrl = res.links.find(data => data?.rel === "approve");
//         if (findUrl) {
//           await WebBrowser.openBrowserAsync(findUrl.href);
//         }
//       }
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   const paymentSuccess = async (id) => {
//     try {
//       const res = await paypalApi.capturePayment(id, accessToken);
//       Alert.alert("Payment successful!");

//       await db.collection('sendTicket').doc(event.organizer).set({
//         email: userEmail,
//         eventId: event.id
//       });

//       const templateParams = {
//         to_name: event.organizer,
//         event_name: event.name,
//         total_price: event.pricetTcket,
//         to_email: userEmail,
//       };

//       emailjs.send('service_0j6gsa6', 'template_fjy76b1', templateParams, 'oHU2f0mLFm9mvleo5')
//         .then((response) => {
//           console.log('SUCCESS!', response.status, response.text);
//         })
//         .catch((error) => {
//           console.log('FAILED...', error);
//         });

//       // إرسال بريد إلكتروني مع صورة التذكرة بعد نجاح الدفع
//       if (ticketImageUrl) {
//         emailjs.send('service_0j6gsa6', 'template_fjy76b1', {
//           to_Email: userEmail,
//           event_id: eventId,
//           ticket_image_url: ticketImageUrl,
//           from_name: 'HandiCraft',
//           from_email: 'hanaamohammed840@gmail.com',
//           bcc: '',
//           cc: '',
//         }, 'oHU2f0mLFm9mvleo5')
//         .then((response) => {
//           console.log('Email successfully sent!', response.status, response.text);
//           setEmailSent(true);
//         })
//         .catch((error) => {
//           console.error('Failed to send email:', error);
//         });
//       }
      
//     } catch (error) {
//       console.log("Error in payment capture:", error);
//     }
//   };

//   const eventDate = event.date ? new Date(event.date) : new Date();

//   return (
//     <Card style={styles.container}>
//       <SafeAreaView style={styles.con}>
//         <View style={styles.content}>
//           <Text style={styles.name}>{event.name}</Text>
//           <Text style={styles.nam}>Organizer: {organizerName}</Text>          
//           <View style={styles.eventMeta}>
//             <View style={styles.metaRow}>
//               <Icon name="calendar-outline" size={20} color="black" style={styles.iconPadding} />
//               <Text>{eventDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</Text>
//             </View>
//             <View style={styles.metaRow}>
//               <Icon name="time-outline" size={20} color="black" style={styles.iconPadding} />
//               <Text>{eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</Text>
//             </View>
//           </View>

//           <Text style={{textAlign:"center"}}>{event.description}</Text>
//           <Text style={{textAlign:"center", marginTop:30, fontWeight:"bold", fontSize:17}}>Total Price: {event.pricetTcket}</Text>
          
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             value={userEmail}
//             onChangeText={setUserEmail}
//           />
//         </View>
       
//         <View style={{ padding: 16 }}>
//           <Button
//             title="Pay"
//             onPress={Payment}
//             color='#0f4fa3'
//           />
//           <Button
//             title="Send Email (Skip Payment)"
//             onPress={() => paymentSuccess(null)}  // يرسل null بدل ID الدفع
//             color='#ff6347'
//           />
//         </View>
//       </SafeAreaView>
//     </Card>
//   );
// }

// export default EventOnline;

// const styles = StyleSheet.create({
//   container: {
//     padding: 30,
//     justifyContent: "center",
//     textAlign: "center",
//     alignContent: "center",
//     marginTop: 100,
//     marginHorizontal: 20
//   },
//   content: {
//     textAlign: "center",
//     alignContent: "center",
//   },
//   eventMeta: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   metaRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconPadding: {
//     padding: 6
//   },
//   name: {
//     textAlign: "center",
//     fontSize: 25,
//     padding: 8
//   },
//   eventImage: {
//     width: "100%",
//     height: "40%",
//     borderRadius: 20
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 15,
//     borderRadius: 5,
//     width: '80%',
//     alignSelf: 'center',
//   },
// });
