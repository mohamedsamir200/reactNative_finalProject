// import React from 'react';
// import { View, Text ,StyleSheet} from 'react-native';

// export default function EventOffline({ route }) {
//   const { event } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text>{event.name}</Text>
//       <Text> {event.address}</Text>
//       <Text> {event.date}</Text>
//       <Text> {event.description}</Text>
//       <Text>Total {event.pricetTcket}</Text>



//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Image} from "react-native";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser'; 
import paypalApi from '../payment/paypalApi'; 
const EventOffline = ({ route }) => {
  const { event } = route.params;

  const ticketPrice = event.pricetacket;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [soldOut, setSoldOut] = useState(false);

  const db = getFirestore();
  const eventDate = event.date ? new Date(event.date) : new Date();
  useEffect(() => {
    const checkSoldOut = async () => {
      if (event.id) {
        try {
          const eventDoc = doc(db, "add event", event.id);
          const docSnapshot = await getDoc(eventDoc);
          const eventData = docSnapshot.data();
          if (eventData?.ticketquantity <= 0) {
            setSoldOut(true);
          }
        } catch (error) {
          console.error("Error checking event status:", error);
        }
      }
    };

    checkSoldOut();
  }, [db, event.id]);

  const increaseCount = () => {
    if (count < event.ticketquantity) {
      setCount(count + 1);
      setTotal((count + 1) * ticketPrice);
    } else {
      Alert.alert("Error", "Cannot select more tickets than available.");
    }
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotal((count - 1) * ticketPrice);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmission = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    try {
      await addDoc(collection(db, "sendTicket"), {
        email: email,
        eventId: event.id,
      });
      console.log("Email saved to Firestore successfully!");
      return true;
    } catch (error) {
      console.error("Error adding email to Firestore:", error);
      return false;
    }
  };

  const handlePayment = async () => {
    if (soldOut) {
      Alert.alert("Sold Out", "This event is sold out.");
      return;
    }

    const emailSubmitted = await handleEmailSubmission();
    if (!emailSubmitted) return;

    Alert.alert("Payment Success", `Paying ${total} EGP with Visa`);
    navigation.navigate("TicketConfirmation", { eventId: event.id });
  };
  const Payment = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'Please enter your email before proceeding.');
      return;
    }

    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token, event.name, event.pricetTcket);  
      setAccessToken(token);
      
      if (res?.links) {
        const findUrl = res.links.find(data => data?.rel === "approve");
        if (findUrl) {
          await WebBrowser.openBrowserAsync(findUrl.href);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const paymentSuccess = async (id) => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      Alert.alert("Payment successful!");

      await db.collection('sendTicket').doc(event.organizer).set({
        email: userEmail,
        eventId: event.id
      });

      // Send email with ticket image
      if (ticketImageUrl) {
        sendEmail(); // Call the email function here after payment success
      }

    } catch (error) {
      console.log("Error in payment capture:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ticketCard}>
      <View style={styles.eventHeader}>
        <Image
          src={event.eventImg}
          style={styles.eventImage}
        />
      </View>      
        <Text style={styles.title}>{event.name}</Text>
        <Text>{event.description}</Text>
        <View style={styles.eventMeta}>
  <View style={styles.metaRow}>
    <Icon name="calendar-outline" size={20} color="black" style={styles.iconPadding} />
    <Text style={styles.metaText}>
      {eventDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
    </Text>
  </View>
  <View style={styles.metaRow}>
    <Icon name="time-outline" size={20} color="black" style={styles.iconPadding} />
    <Text style={styles.metaText}>
      {eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}
    </Text>
  </View>
</View>


        <View style={styles.ticketCounter}>
          <TouchableOpacity onPress={decreaseCount} disabled={soldOut}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity onPress={increaseCount} disabled={soldOut}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.priceText}>Total: {total} EGP</Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, emailError && { borderColor: 'red' }]}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 ,textAlign:"center" ,alignContent:"center"},
  ticketCard: { backgroundColor: "#FCFCFC", padding: 20, borderRadius: 10, elevation: 3 , flex: 0, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10,marginTop:20 },
  ticketCounter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  counterButton: { fontSize: 30, paddingHorizontal: 10 ,backgroundColor:"#8A6F5C" ,borderRadius:9 ,marginHorizontal:50},
  priceText: { fontSize: 18, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10, borderRadius: 5 },
  errorText: { color: "red" },
  payButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center" },
  payButtonText: { color: "#fff", fontWeight: "bold" ,width:200,textAlign:"center"},
  eventHeader: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  eventImage: {

    width: "100%",
    height: "100%",
    borderRadius:20
   
  },
});

export default EventOffline;
