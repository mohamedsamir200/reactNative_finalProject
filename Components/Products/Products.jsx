// import { View, Text, Image, StyleSheet } from "react-native";
// import React from "react";
// import { Button, Card } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import routes from './../utilities/Routes';

// export default function Products() {
//     const {navigate}=useNavigation();
//   return (
//     <>
//       <View style={styles.flexStyle} >
//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product1.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>

//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product2.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>
//       </View>

//       <View style={styles.flexStyle} >
//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product3.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>

//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product4.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>
//       </View>

//       <View style={styles.flexStyle} >
//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product1.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>

//         <Card style={{ width: 165, backgroundColor: "white" }} onPress={() => navigate(routes.details)}>
//           <Card.Cover source={require("../assets/ProductsImages/product2.png")}/>
//           <View style = {{marginTop : 5 , padding : 5}}>
//             <Text>Brass product</Text>
//             <Text style = {{marginVertical : 5}}>
//               The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
//               Bottle (1000 ML)
//             </Text>
//             <Text>Rs. 799</Text>
//           </View>
//         </Card>
//       </View>
//       <Button mode="contained" onPress={()=>navigate(routes.allProducts)}>Show More</Button>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//     flexStyle : {
//         gap : 5 ,
//         marginVertical: 15,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
      
//     }
// })



import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import db from "../../Config/firebase";

import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import MasonryList from "react-native-masonry-list"; 
import PostCard from "./ProCard";
import { Button, IconButton, Menu, Divider } from "react-native-paper"; 

function Posts() {
  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("accountType", "==", "artist")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const artistArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setArtists(artistArr);
      },
      []
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        setFilteredProducts(productArr);
        setLoading(false);
      }
    );
    getUserData();

    return () => unsubscribe();
  }, []);

  const [UID, setUID] = useState("");
  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUID(userData.id);
    });
  }

  async function clickMe(product) {
    await addDoc(collection(db, "Bag"), {
      name: product.title,
      imgsrc: product.img,
      description: product.description,
      price: product.price,
      basePrice: product.price,
      quantity: 1,
      userID: UID,
    });
  }

  const sortItemsHighest = () => {
    const sortedItems = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsLowest = () => {
    const sortedItems = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsByName = () => {
    const sortedItems = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredProducts(sortedItems);
  };

  const handleFilterChange = (categories) => {
    setSelectedCategories(categories);
    filterProducts(categories, priceRange);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    filterProducts(selectedCategories, { min, max });
  };

  const filterProducts = (categories, price) => {
    let filtered = products;

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.typeproduct)
      );
    }

    if (price.min !== "" || price.max !== "") {
      filtered = filtered.filter((product) => {
        const minPrice = price.min ? parseFloat(price.min) : 0;
        const maxPrice = price.max ? parseFloat(price.max) : Infinity;
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {loading ? (
        // <Loader />
        <Text>hh</Text>
      ) : (
        <View>
                      <Text>{filteredProducts.length} Items Found</Text>

          {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
            <Button onPress={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}>
              Filter Options
            </Button>

            {isFilterDropdownOpen && (
              <Menu
                visible={isFilterDropdownOpen}
                onDismiss={() => setIsFilterDropdownOpen(false)}
                anchor={
                  <Button onPress={() => setIsFilterDropdownOpen(true)}>Show Menu</Button>
                }
              >
                <Menu.Item onPress={() => handleFilterChange(["Category1"])} title="Category 1" />
                <Divider />
                <Menu.Item onPress={() => handleFilterChange(["Category2"])} title="Category 2" />
              </Menu>
            )}


            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button onPress={sortItemsHighest}>From Highest to Lowest</Button>
              <Button onPress={sortItemsLowest}>From Lowest to Highest</Button>
              <Button onPress={sortItemsByName}>By Name</Button>
            </View>
          </View> */}

          <MasonryList
        images={currentProducts.map((product) => ({
          uri: product.img,
          title: product.title,
          artist: artists.find((artist) => artist.id === product.ownerID),
          price: product.price,
          onPress: () => clickMe(product),
        }))}
        renderImage={(image) => (
          <PostCard
            product={image} // تمرير المنتج
            artist={image.artist} // تمرير الفنان
            clickMe={clickMe} // تمرير دالة النقر
          />
        )}
      />
        </View>
      )}
    </ScrollView>
  );
}

export default Posts;
