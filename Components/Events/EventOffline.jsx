// import React from 'react';
// import { View, Text } from 'react-native';

// function EventOffline({ route }) {
//   const { event } = route.params;

//   return (
//     <View>
//       <Text>{event.name}</Text>
//       <Text> {event.eventtype}</Text>
//     </View>
//   );
// }

// export default EventOffline;
import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Alert, Modal, StyleSheet } from "react-native"; // تأكد من وجود Modal هنا
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import PayPalCheckout from 'react-native-paypal-checkout';

export default function EventOffline() {
  const navigation = useNavigation();
  const route = useRoute();
  const event = route.params?.event || {};
  const ticketPrice = event.pricetacket;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [otherEvents, setOtherEvents] = useState([]);
  const [soldOut, setSoldOut] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "add event"));
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOtherEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [db]);

  useEffect(() => {
    const checkSoldOut = async () => {
      if (event.id) {
        try {
          const eventDoc = doc(db, "add event", event.id);
          const docSnapshot = await getDocs(eventDoc);
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
    setCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount <= event.ticketquantity) {
        setTotal(newCount * ticketPrice);
        return newCount;
      } else {
        Alert.alert("خطأ", "لا يمكنك اختيار تذاكر أكثر من المتاحة.");
        return prevCount;
      }
    });
  };

  const decreaseCount = () => {
    setCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 1);
      setTotal(newCount * ticketPrice);
      return newCount;
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmission = async () => {
    if (!validateEmail(email)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح.");
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
      Alert.alert("الحدث مكتمل", "هذا الحدث قد تم بيع كل تذاكره.");
      return;
    }
    
    const emailSubmitted = await handleEmailSubmission();
    if (!emailSubmitted) return;

    console.log(`Paying ${total} EGP with PayPal`);
    setShowModal(false);
    navigation.navigate('TicketConfirmation', { eventId: event.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text>{event.description}</Text>

      <View style={styles.ticketControls}>
        <Button title="-" onPress={decreaseCount} disabled={soldOut} />
        <Text style={styles.ticketCount}>{count}</Text>
        <Button title="+" onPress={increaseCount} disabled={soldOut} />
      </View>

      <Text style={styles.totalPrice}>{total} EGP</Text>
      <Button title="دفع" onPress={() => setShowModal(true)} />

      {/* Modal for Payment */}
      {showModal && (
        <Modal visible={showModal} transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>دفع</Text>
            <TextInput
              style={styles.input}
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <Button title={`دفع ${total} EGP`} onPress={handlePayment} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ticketControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  ticketCount: {
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
});
