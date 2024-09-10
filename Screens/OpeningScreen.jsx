import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import routes from './../utilities/Routes';


import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const images = [
  require("../assets/openingImages/opening-1.jpg"),
  require("../assets/openingImages/opening-2.jpg"),
  require("../assets/openingImages/opening-3.jpg"),
];

export default function OpeningScreen() {
    const {navigate}=useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / screenWidth);
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
      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
            {index === images.length - 1 &&
              activeIndex === images.length - 1 && (
                <View style={styles.textContainer}>
                  <Text style={styles.text} onPress={()=>navigate(routes.mainScreen)}>Let's Start</Text>
                </View>
              )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
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
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: screenWidth,
    height: screenHeight + 60,
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
