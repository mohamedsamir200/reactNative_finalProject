import React, { useState } from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";

function Cards({ data, onTicketClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isOnline = data.eventtype === "online";
  const descriptionMaxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.ticketHeader}>
        <Image
          source={{ uri: data.eventImg }} 
          style={styles.eventImage}
          resizeMode="cover"
        />
      </View>

      {/* Body */}
      <View style={styles.ticketDetails}>
        <Text style={styles.eventName}>{data.name}</Text>
        <View style={styles.ticketMeta}>
          <View style={styles.metaRow}>
          
            <Text>{new Date(data.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</Text>
          </View>

          <View style={styles.metaRow}>
           
            <Text>{new Date(data.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {data.description.length > descriptionMaxLength && !isExpanded
            ? `${data.description.substring(0, descriptionMaxLength)}...`
            : data.description}
        </Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.readMoreText}>
            {isExpanded ? "Show Less" : "Read More"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onTicketClick} style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  ticketHeader: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  ticketDetails: {
    padding: 20,
  },
  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ticketMeta: {
    flexDirection: "column",
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  description: {
    color: "#333",
    marginVertical: 10,
  },
  readMoreText: {
    color: "#b22222",
    marginTop: 5,
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 20,
    backgroundColor: "#b22222",
    paddingVertical: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Cards;
