import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import routes from "./../utilities/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const images = [
  require("../assets/openingImages/opening-1.jpg"),
  require("../assets/openingImages/opening-2.jpg"),
  require("../assets/openingImages/opening-3.jpg"),
];

export default function OpeningScreen() {
  // AsyncStorage.clear();
  const { navigate } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth); // Using Math.round for better rounding
    setActiveIndex(index);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3 }]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text} onPress={() => navigate(routes.mainScreen)}>
          Let's Start
        </Text>
      </View>
      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
            {index === images.length - 1 &&
              activeIndex === images.length - 1 && (
                <View style={styles.textContainer}>
                  <TouchableOpacity onPress={() => navigate(routes.mainScreen)}>
                    <Text style={styles.text}>Let's Start</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll } // Keep listener for state updates
        )}
        scrollEventThrottle={16}
      />
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight, // Keeping this as screenHeight
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: screenWidth,
    height: screenHeight + 60, // Restoring original height
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  textContainer: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
