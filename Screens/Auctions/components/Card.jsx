import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({
  productData,
  imgsrc,
  productType,
  title,
  price,
  isMember,
  func,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = () => {
    navigation.navigate("ProposalsScreen", {
      product: productData, // Ensure productData is correctly passed here
    });
  };

  return (
    <View style={styles.cardContainer}>
      {/* Image Section */}
      <TouchableOpacity onPress={handleImageClick}>
        <Image
          style={styles.productImage}
          source={{ uri: imgsrc }} // Ensure imgsrc is a valid URL
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Title and Description */}
      <View style={styles.cardContent}>
        <Text style={styles.productType}>{productType}</Text>
        <Text style={[styles.productTitle, isExpanded ? {} : styles.lineClamp]}>
          {title}
        </Text>

        {/* Show More/Show Less Button */}
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.toggleText}>
            {isExpanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>

        {/* Price Section */}
        <Text style={styles.productPrice}>
          Auction Initial Price: {price} $
        </Text>
      </View>

      {/* Join Auction Button (only if user is not a member) */}
      {!isMember && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={func}>
            <Text style={styles.joinButtonText}>Join Auction</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4, // For Android shadow
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  productType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E402D",
  },
  productTitle: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
  },
  lineClamp: {
    height: 40, // Clamp height to limit text
    overflow: "hidden",
  },
  toggleText: {
    color: "#1E90FF",
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  joinButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProductCard;
