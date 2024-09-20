import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Button, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { collection, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import db from "../../Config/firebase";
import Loader from "../../Navigation/Loader";
import Cards from "./Cards"; 

function Events({ navigation }) {
  let [events, setEvents] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [filter, setFilter] = useState("All");
  let [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const storage = getStorage();
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
      filtered = filtered.filter((event) => event.eventtype === filter);
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

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 30, fontFamily: "cursive", color: "#b22222" }}>
        Events
      </Text>

      <View style={{ marginVertical: 20 }}>
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

      <Svg width="24" height="24" viewBox="0 0 128 128">
        <Path
          d="M-25,-48 C-25,-48 25,-48 25,-48 C37.702999114990234,-48 48,-37.702999114990234 48,-25 C48,-25 48,25 48,25 C48,37.702999114990234 37.702999114990234,48 25,48 C25,48 -25,48 -25,48 C-37.702999114990234,48 -48,37.702999114990234 -48,25 C-48,25 -48,-25 -48,-25 C-48,-37.702999114990234 -37.702999114990234,-48 -25,-48z"
          stroke="black"
          strokeWidth="7"
          fill="none"
        />
      </Svg>

      <View style={{ marginVertical: 20 }}>
        {paginatedEvents.map((event) => (
          <Cards
            key={event.id}
            data={event} // تمرير بيانات الحدث للكارد
            onTicketClick={() => handleTicketClick(event)} // تمرير حدث الضغط
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default Events;
