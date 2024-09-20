import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ReactStars from "react-native-stars";

function PostCard({ product, artist, clickMe }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "gray",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
        position: "relative", // لضبط وضع التفاصيل
      }}
      onPress={() => clickMe(product)}
      onMouseEnter={() => setIsHovered(true)} // للمؤشر
      onMouseLeave={() => setIsHovered(false)} // للمؤشر
      onTouchStart={() => setIsHovered(true)} // للمس
      onTouchEnd={() => setIsHovered(false)} // للمس
    >
      <Image
        source={{ uri: product.img }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
      />
      {isHovered && ( // يظهر التفاصيل عند الهوفر
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
            {product.description} {/* تأكدي من وجود خاصية الوصف */}
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            By: {artist?.name || "Unknown"}
          </Text>
          <ReactStars
            count={5}
            value={product.rating} // تأكدي من وجود خاصية التقييم
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
