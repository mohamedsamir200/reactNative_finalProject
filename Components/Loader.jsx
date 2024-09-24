import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <Svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.loader}
      >
        <Path
          d="M 56.3752 2 H 7.6248 C 7.2797 2 6.9999 2.268 6.9999 2.5985 V 61.4015 C 6.9999 61.7321 7.2797 62 7.6248 62 H 56.3752 C 56.7203 62 57.0001 61.7321 57.0001 61.4015 V 2.5985 C 57.0001 2.268 56.7203 2 56.3752 2 Z"
          stroke="black"
          strokeWidth="1"
        />
        <Path
          d="M 55.7503 60.803 H 8.2497 V 3.1971 H 55.7503 V 60.803 Z"
          stroke="black"
          strokeWidth="1"
        />
        <Path
          d="M 29.7638 47.6092 C 29.4971 47.3997 29.1031 47.4368 28.8844 47.6925 C 28.6656 47.9481 28.7046 48.3253 28.9715 48.5348 L 32.8768 51.6023 C 32.9931 51.6936 33.1333 51.738 33.2727 51.738 C 33.4533 51.738 33.6328 51.6634 33.7562 51.519 C 33.975 51.2634 33.936 50.8862 33.6692 50.6767 L 29.7638 47.6092 Z"
          fill="black"
        />
        <Path
          d="M 42.3557 34.9046 C 38.4615 34.7664 36.9617 37.6749 36.7179 39.2213 L 35.8587 44.2341 C 35.8029 44.5604 36.0335 44.8681 36.374 44.9218 C 36.4084 44.9272 36.4424 44.9299 36.476 44.9299 C 36.7766 44.9299 37.0415 44.7214 37.0918 44.4281 L 37.9523 39.4076 C 37.9744 39.2673 38.544 35.9737 42.311 36.1007 C 42.6526 36.1124 42.9454 35.8544 42.9577 35.524 C 42.9702 35.1937 42.7006 34.9164 42.3557 34.9046 Z"
          fill="black"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    width: "100%",
  },
  loader: {
    width: 64,
    height: 64,
  },
});

export default Loader;
