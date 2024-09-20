import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function Cards({ data, oneventClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionMaxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const eventName = typeof data.name === "string" ? data.name :"";
  const eventDate = data.date ? new Date(data.date) : new Date();
  const eventDescription = typeof data.description === "string" ? data.description : "";

  return (
    <View style={styles.card}>
      <View style={styles.eventHeader}>
        <View style={styles.notch}></View>
        <View style={styles.notchr}></View>

        <Image
          source={{ uri: data.eventImg }}
          style={styles.eventImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.dottedLine} />

      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{eventName}</Text>
        <View style={styles.eventMeta}>
          <View style={styles.metaRow}>
            <Text>{eventDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text>{eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {eventDescription.length > descriptionMaxLength && !isExpanded
            ? `${eventDescription.substring(0, descriptionMaxLength)}...`
            : eventDescription}
        </Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.readMoreText}>
            {isExpanded ? "Show Less" : "Read More"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={oneventClick} style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      position: "relative",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 5,
      padding:12,
      marginVertical: 20,
      width: "90%",
      alignSelf: "center",
      overflow: "hidden",
    },
    eventHeader: {
      width: "100%",
      height: 180,
      position: "relative",
    },
    eventImage: {
      width: "100%",
      height: "120%",
     
    },
    notch: {
      position: "absolute",
      top: "20%",
      left: -100,
      width: 125,
      height: 125,
      backgroundColor: "#fff",
      borderRadius: 90,
      zIndex: 1,
    },
    notchr:{
        position: "absolute",
        top: "20%",
        right: -100,
        width: 125,
        height: 125,
        backgroundColor: "#fff",
        borderRadius: 90,
        zIndex: 1,
    },
    eventDetails: {
      padding: 10,
      paddingTop:10
    },
    eventName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    eventMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    description: {
      color: "#333",
      marginVertical: 10,
      textAlign: "center",
    },
    readMoreText: {
      color: "#b22222",
      marginTop: 5,
      fontWeight: "bold",
      textAlign: "center",
    },
    joinButton: {
      marginTop: 20,
      backgroundColor: "#b22222",
      paddingVertical: 10,
      borderRadius: 5,
    },
    joinButtonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
    dottedLine: {
        borderBottomColor: "black",
        borderBottomWidth: 2.5,
        borderStyle: 'dotted',
        width: '100%',
        alignSelf: 'center',
        padding:20
      },
  });
  

export default Cards;
