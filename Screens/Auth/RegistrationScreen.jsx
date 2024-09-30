import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Feather icons
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import db, { auth, provider } from "../../Config/firebase";
import { useNavigation } from "@react-navigation/native"; // Navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";

export default function LoginScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  // Function to validate the email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate the password strength (at least 6 characters)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // Function to validate that names don't contain special characters or numbers
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  // Function to validate all fields
  const validateInputs = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First and Last Name are required");
      return false;
    }
    if (!isValidName(firstName) || !isValidName(lastName)) {
      setError("Names can only contain letters");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!isValidPassword(password.trim())) {
      setError("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  // Store user ID
  const storeUserID = async (userID) => {
    try {
      await AsyncStorage.setItem("id", userID);
      console.log("User UID stored successfully");
    } catch (error) {
      console.log("Error storing UID:", error);
    }
  };

  // Register function
  async function registerUser() {
    setError(""); // Clear previous errors
    if (!validateInputs()) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        firstname: firstName,
        lastname: lastName,
        email: trimmedEmail,
        id: user.uid,
        accountType: "artist",
        profilePic: "",
        about: "",
        notifications: [],
      });

      storeUserID(user.uid);
      navigation.replace("OpeningScreen");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  function signupWithGoolge() {
    signInWithPopup(auth, provider).then(async (data) => {
      let fullname = data.user.displayName.split(" ");
      await addDoc(collection(db, "users"), {
        firstname: fullname[0],
        lastname: fullname[1],
        email: data.user.email,
        id: data.user.uid,
        accountType: "customer",
        profilePic: "", // Add account type to Firestore
      });
      storeUserID(data.user.uid);

      navigation.replace("OpeningScreen");
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Create Account</Text>
      <Text style={styles.welcomeText}>
        Fill your information below or register with your social account
      </Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.signInButton, loading && { opacity: 0.7 }]}
        onPress={registerUser}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Media Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={signupWithGoolge}
        >
          <Image
            source={require("../../assets/google.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Text */}
      <Text style={styles.signUpText}>
        Already have an account?{" "}
        <Text
          onPress={() => {
            navigation.replace("LoginScreen");
          }}
          style={styles.signUpLink}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  signInText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#344646",
  },
  welcomeText: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#344646",
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#344646",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#777",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: "#333",
  },
  signUpText: {
    textAlign: "center",
    color: "#777",
  },
  signUpLink: {
    color: "#344646",
    fontWeight: "600",
  },
});
