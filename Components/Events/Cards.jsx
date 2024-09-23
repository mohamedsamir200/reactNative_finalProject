import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

function Cards({ data, onEventClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionMaxLength = 30;
  const isOnline = data.eventtype === "online";

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const eventName = typeof data.name === "string" ? data.name : "";
  const eventDate = data.date ? new Date(data.date) : new Date();
  const eventDescription = typeof data.description === "string" ? data.description : "";

  return (
    <TouchableOpacity style={styles.card} onPress={() => onEventClick(data)}>
      <View style={[styles.eventType, { backgroundColor: isOnline ? '#16a34a' : '#d97706' }]}>
        <Text style={styles.eventTypeText}>{data.eventtype}</Text>
      </View>

      <View style={styles.eventHeader}>
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
            <Icon name="calendar-outline" size={20} color="black" style={styles.iconPadding} />
            <Text>{eventDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</Text>
          </View>
          <View style={styles.metaRow}>
            <Icon name="time-outline" size={20} color="black" style={styles.iconPadding} />
            <Text>{eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {eventDescription.length > descriptionMaxLength && !isExpanded
            ? `${eventDescription.substring(0, descriptionMaxLength)}...`
            : eventDescription}
        </Text>
        {eventDescription.length > descriptionMaxLength && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.readMoreText}>
              {isExpanded ? "Show Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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
      marginVertical: 6,
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
      height: "100%",
      borderRadius:20
     
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
        padding:4
      },
        eventTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:"center"
  },
    eventType: {
      top:14,
    position: 'absolute',
    left: -40,
    padding: 5,
    width:125,
    textAlign:"center",
zIndex:10,
    transform: [{ rotate: '-45deg' }],
  },
  eventTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:"center"
  },
  });
  

export default Cards;
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// function Cards({ data, onTicketClick }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const isOnline = data.eventtype === "online";
//   const descriptionMaxLength = 80;

//   const toggleDescription = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.cardContainer}>
//       {/* Left Section */}
//       <View >
    
//         <View style={[styles.eventType, { backgroundColor: isOnline ? '#16a34a' : '#d97706' }]}>
//           <Text style={styles.eventTypeText}>{data.eventtype}</Text>
//         </View>
//       </View>

//       {/* Center Section */}
//       <View style={styles.centerSection}>
//         <View style={styles.header}>
//           <Text style={styles.eventName}>{data.name}</Text>
//           {/* <Text style={styles.category}>{data.category}</Text> */}
//         </View>
//         {/* <Text style={styles.description}>
//           {data.description.length > descriptionMaxLength && !isExpanded ? `${data.description.substring(0, descriptionMaxLength)}...` : data.description}
//         </Text>
//         <TouchableOpacity onPress={toggleDescription}>
//           <Text style={styles.readMore}>{isExpanded ? 'Show Less' : 'Read More'}</Text>
//         </TouchableOpacity> */}
//         <View style={styles.media}>
//         <Text style={styles.dayText}>{new Date(data.date).getDate()}</Text>
//         <Text style={styles.monthText}>
//           {new Date(data.date).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })}
//         </Text>
//         <Text style={styles.timeText}>
//           {new Date(data.date).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
//         </Text>
//         </View>
           
//         <TouchableOpacity onPress={onTicketClick} style={styles.viewDetailsButton}>
//           <Text style={styles.buttonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Right Section */}
//       <View style={styles.rightSection}>
//         <Image
//           source={{ uri: data.eventImg }}
//           style={styles.eventImage}
//           resizeMode="cover"
//         />
//         <View style={styles.imageOverlay} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   media:{
//     textAlign:"center",
//     alignContent:"center",
//     justifyContent:"space-between",

//   },
//   cardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 16,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     elevation: 5,
//     overflow: 'hidden',
//   },
 
//   dayText: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   monthText: {
//     fontSize: 16,
//     textTransform: 'uppercase',
//   },
//   timeText: {

//   },
//   eventType: {
//     position: 'absolute',
//     left: -63,
//     padding: 5,
//     width:150,
//     textAlign:"center",

//     transform: [{ rotate: '-45deg' }],
//   },
//   eventTypeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign:"center"
//   },
//   centerSection: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   eventName: {
//     fontSize: 20,
//     paddingTop:30,
//     fontWeight: 'bold',
//   },
//   category: {
//     fontSize: 12,
//     color: '#666',
//   },
//   description: {
//     marginTop: 10,
//     color: '#333',
//   },
//   readMore: {
//     color: '#3b82f6',
//     marginTop: 5,
//   },
//   viewDetailsButton: {
//     backgroundColor: '#b91c1c',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   rightSection: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   eventImage: {
//     width: 100,
//     height: 200,
//     borderRadius: 10,
//   },
//   imageOverlay: {
//     // backgroundColor: '#f9f2e6',
//     // width: 100,
//     // height: 40,
//     // position: 'absolute',
//     // bottom: 10,
//     // borderRadius: 10,
//   },
// });

// export default Cards;
