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
// import { StyleSheet, View, Button, Alert, SafeAreaView, Text, TextInput } from 'react-native';
// import * as WebBrowser from 'expo-web-browser'; 
// import paypalApi from '../payment/paypalApi'; 
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Card } from 'react-native-paper';
// import db from '../../Config/firebase'; 
// import emailjs from '@emailjs/react-native';
// import { getFirestore, doc, getDoc, query, collection, getDocs, where } from "firebase/firestore";

// function EventOnline({ route }) {
//   const { event } = route.params; 
//   const [accessToken, setAccessToken] = useState(null);
//   const [organizerName, setOrganizerName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [ticketImageUrl, setTicketImageUrl] = useState('');
//   const eventId = event.id; 

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

//   // Function to send email independently of payment
//   const sendEmail = async () => {
//     try {
//       const templateParams = {
//         to_name: event.organizer,
//         event_name: event.name,
//         total_price: event.pricetTcket,
//         to_email: userEmail,
//       };

//       // Sending ticket image email if available
//       await emailjs.send('service_0j6gsa6', 'template_fjy76b1', {
//         to_Email: userEmail,
//         event_id: eventId,
//         ticket_image_url: ticketImageUrl,
//         from_name: 'HandiCraft',
//         from_email: 'hanaamohammed840@gmail.com',
//         bcc: '',
//         cc: '',
//       }, 'oHU2f0mLFm9mvleo5');

//       Alert.alert('Email Sent', 'The email has been successfully sent.');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       Alert.alert('Error', 'Failed to send the email.');
//     }
//   };

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

//       // Send email with ticket image
//       if (ticketImageUrl) {
//         sendEmail(); // Call the email function here after payment success
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
//             title="Send Email"
//             onPress={sendEmail}  // New button to send email without payment
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

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Button, Alert, SafeAreaView, Text, TextInput } from 'react-native';
// import * as WebBrowser from 'expo-web-browser'; 
// import paypalApi from '../payment/paypalApi'; 
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Card } from 'react-native-paper';
// import db from '../../Config/firebase'; 
// import emailjs from '@emailjs/react-native';
// import { getFirestore, doc, getDoc, query, collection, getDocs, where } from "firebase/firestore";

// // Initialize EmailJS with your public key
// emailjs.init("YzBCueRBgIlDlOxi5");

// function EventOnline({ route }) {
//   const { event } = route.params; 
//   const [accessToken, setAccessToken] = useState(null);
//   const [organizerName, setOrganizerName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [ticketImageUrl, setTicketImageUrl] = useState('');
//   const eventId = event.id; 
//   emailjs.init("YzBCueRBgIlDlOxi5");

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
//         where("eventId", "==", eventId) // استخدام شرط للحصول على البريد الإلكتروني المناسب
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
//   const sendEmail = async () => {
//     if (!userEmail) {
//       Alert.alert('Error', 'No email address available to send the email.');
//       return;
//     }
  
//     try {
//       const templateParams = {
//         to_name: organizerName,
//         event_name: event.name,
//         total_price: event.pricetTcket,
//         to_email: userEmail,
//         ticket_image_url: ticketImageUrl,
//       };
  
//       // استخدام المعرف الصحيح للخدمة والقالب
//       await emailjs.send('service_0j6gsa6', 'template_fjy76b1', templateParams, 'YzBCueRBgIlDlOxi5');
  
//       Alert.alert('Email Sent', 'The email has been successfully sent.');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       Alert.alert('Error', 'Failed to send the email.');
//     }
//   };
  

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
//       Alert.alert('Error', 'Failed to initiate payment.');
//     }
//   };

//   const paymentSuccess = async (id) => {
//     try {
//       const res = await paypalApi.capturePayment(id, accessToken);
//       if (res) {
//         Alert.alert("Payment successful!");

//         await db.collection('sendTicket').doc(event.organizer).set({
//           email: userEmail,
//           eventId: event.id
//         });

//         // Send email with ticket image
//         if (ticketImageUrl) {
//           await sendEmail(); // Call the email function here after payment success
//         }
//       } else {
//         Alert.alert('Error', 'Payment capture failed.');
//       }
//     } catch (error) {
//       console.log("Error in payment capture:", error);
//       Alert.alert('Error', 'Failed to capture payment.');
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

//           <Text style={{ textAlign: "center" }}>{event.description}</Text>
//           <Text style={{ textAlign: "center", marginTop: 30, fontWeight: "bold", fontSize: 17 }}>
//             Total Price: {event.pricetTcket}
//           </Text>
          
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
//             title="Send Email"
//             onPress={sendEmail}  // New button to send email without payment
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
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10
//   },
//   nam: {
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   con: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
// });



import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert, SafeAreaView, Text, TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import paypalApi from '../payment/paypalApi'; // Assuming this handles PayPal integration
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import db from '../../Config/firebase'; // Assuming this is your Firebase configuration
import emailjs from '@emailjs/react-native';
import { getFirestore, doc, getDoc, query, collection, getDocs, where } from "firebase/firestore";

// Initialize EmailJS with your PUBLIC KEY (replace with yours)
emailjs.init("YzBCueRBgIlDlOxi5"); // Replace with your actual EmailJS public key

export default function EventOnline({ route }) {
  const { event } = route.params;
  const [accessToken, setAccessToken] = useState(null);
  const [organizerName, setOrganizerName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ticketImageUrl, setTicketImageUrl] = useState('');
  const eventId = event.id;

  const fetchOrganizer = async (organizer) => {
    try {
      const organizerDoc = await db.collection('users').doc(organizer).get();
      if (organizerDoc.exists) {
        const organizerData = organizerDoc.data();
        const fullName = `${organizerData.firstname} ${organizerData.lastname}`;
        setOrganizerName(fullName);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Error fetching organizer:', error);
    }
  };

  useEffect(() => {
    if (event.organizer) {
      fetchOrganizer(event.organizer);
    }
  }, [event.organizer]);

  useEffect(() => {
    if (eventId) {
      const ticketDocRef = doc(db, "add event", eventId);
      getDoc(ticketDocRef)
        .then((docSnap) => {
          if (docSnap.exists) {
            const ticketImg = docSnap.data().ticketImg;
            setTicketImageUrl(ticketImg);
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching ticket image URL: ", error);
        });

      const emailQuery = query(
        collection(db, "sendTicket"),
        where("eventId", "==", eventId) // Filter for specific event email
      );

      getDocs(emailQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserEmail(userDoc.data().email);
          } else {
            console.error("No email found for this event.");
          }
        })
        .catch((error) => {
          console.error("Error fetching email from Firestore:", error);
        });
    }
  }, [eventId]);

  const sendEmail = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      const templateParams = {
        to_name: organizerName,
        event_name: event.name,
        total_price: event.pricetTcket,
        to_email: userEmail,
        ticket_image_url: ticketImageUrl, // Include ticket image URL if available
      };

      await emailjs.send('service_0j6gsa6', 'template_fjy76b1', templateParams, 'YzBCueRBgIlDlOxi5');

      Alert.alert('Email Sent', 'The email has been successfully sent.');
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'Failed to send the email.');
    }
  };

  // ... rest of your component logic for payment and event details

  return (
    <Card >
      {/* ... your component rendering logic */}
      <TextInput
            // style={styles.input}
            placeholder="Enter your email"
            value={userEmail}
            onChangeText={setUserEmail}
          />
      <Button title="Send Email" onPress={sendEmail} color='#ff6347' />
    </Card>)}
