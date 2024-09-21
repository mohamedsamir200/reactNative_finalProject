import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { collection, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import db from "../../Config/firebase";
import Cards from "./Cards";
import Icon from 'react-native-vector-icons/Ionicons'; 
function Events({ navigation }) {
  let [events, setEvents] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [onlineChecked, setOnlineChecked] = useState(false);
  const [offlineChecked, setOfflineChecked] = useState(false);
  let [filter, setFilter] = useState("All");
  let [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const storage = getStorage();

  const paginatedEvents = filteredEvents.slice(

  );

  const fetchEventData = (collectionName) => {
    return new Promise((resolve, reject) => {
      onSnapshot(
        collection(db, collectionName),
        async (snapshot) => {
          const eventsPromises = snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageRef = ref(storage, `eventimg/${data.imagePath}`);
            try {
              const imageUrl = await getDownloadURL(imageRef);
              return { ...data, id: doc.id, imageUrl };
            } catch (error) {
              console.error("Error fetching image URL:", error);
              return { ...data, id: doc.id, imageUrl: null };
            }
          });

          const eventsWithImages = await Promise.all(eventsPromises);
          resolve(eventsWithImages);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const addEventData = await fetchEventData("add event");
        const onlineEventData = await fetchEventData("online event");

        const allEvents = [...addEventData, ...onlineEventData];
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    if (filter !== "All") {
      filtered = filtered.filter((event) => event.eventtype === filter.toLowerCase());
    }
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [filter, searchTerm, events]);

  const handleTicketClick = (event) => {
    if (event.eventtype === "online") {
      navigation.navigate("EventOnline", { event });
    } else {
      navigation.navigate("Ticket", { event });
    }
  };
  const renderCheckBox = (checked) => (
    <Icon name={checked ? "checkbox" : "ellipse-outline"} size={24} color="#D7A182" />
  );
  

  return (
    <ScrollView style={{ padding: 20 }}>
   

      <View >
        <TextInput
          placeholder="Search events..."
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
          }}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {/* Filter Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => setFilter("All")}>
          {renderCheckBox(filter === "All")}
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 5, color: filter === "All" ? "#b22222" : "#000" }}>
          All Events
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => setFilter("online")}>
          {renderCheckBox(filter === "online")}
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 5, color: filter === "online" ? "#b22222" : "#000" }}>
          Online
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => setFilter("offline")}>
          {renderCheckBox(filter === "offline")}
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 5, color: filter === "offline" ? "#b22222" : "#000" }}>
          Offline
        </Text>
      </View>
    </View>

      <View style={{ }}>
        {paginatedEvents.map((event) => (
          <Cards
            key={event.id}
            data={event}
            onPress={() => handleTicketClick(event)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default Events;
