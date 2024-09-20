import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity ,StyleSheet  } from "react-native";
import ReactStars from "react-native-stars";

function PostCard({ product, artist, clickMe }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={ styles.card
     
      }
      onPress={() => clickMe(product)}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onTouchStart={() => setIsHovered(true)} 
      onTouchEnd={() => setIsHovered(false)} 

    >
             <View style={styles.imageContainer}>
      <Image
        source={{ uri: product.img }}
        style={styles.img}
        resizeMode="cover"
      /></View>
      {isHovered && (
        <View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {product.title}
          </Text>
          <Text style={{ color: "white", fontSize: 14 }}>
            {product.description}
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            By: {artist?.name || "Unknown"}
          </Text>
          <ReactStars
            count={5}
            value={product.rating}
            size={20}
            half={true}
            edit={false}
            color={"#ffd700"}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default PostCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 100,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        overflow: 'hidden', 
      },
      imageContainer: {
        width: '100%',
        height: 200, 
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%', 
        borderRadius: 100, 
      },
  });