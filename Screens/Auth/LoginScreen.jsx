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
import Icon from "react-native-vector-icons/Feather";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import auth from "@react-native-firebase/auth";

// Feather icons
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
// import db, { auth, provider } from "../../Config/firebase";
import { useNavigation } from "@react-navigation/native"; // Navigation
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  // GoogleSignin.configure({
  //   webClientId:
  //     "95741196127-tobu2n4u03mimd29r9ld07rjr73p0g70.apps.googleusercontent.com", // Get this from Firebase
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  // Validate inputs
  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return false;
    }
    return true;
  };
  const storeUserID = async (userID) => {
    try {
      await AsyncStorage.setItem("id", userID);
      console.log("User UID stored successfully");
      console.log(AsyncStorage.getItem("id"));
    } catch (error) {
      console.log("Error storing UID:", error);
    }
  };
  // Login Function
  const loginAcc = () => {
    setError(""); // Clear previous errors
    if (!validateInputs()) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    setLoading(true);
    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((res) => {
        setLoading(false);
        console.log("Logged in:", res.user.uid);
        storeUserID(res.user.uid);
        navigation.replace("OpeningScreen"); // Navigate after login
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        Alert.alert("Login Failed", err.message);
      });
  };
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     // Create a Firebase credential with the Google ID token
  //     const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);

  //     // Sign in with Firebase using the credential
  //     const userCredential = await signInWithCredential(auth, googleCredential);

  //     // Successfully signed in with Google
  //     console.log("User signed in with Google:", userCredential.user);
  //     storeUserID(userCredential.user.uid);
  //     navigation.replace("OpeningScreen"); // Navigate after Google login
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("User cancelled the login");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("Sign-in is in progress already");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("Play services not available");
  //     } else {
  //       console.log("Some other error happened", error);
  //       Alert.alert("Google Sign-In Failed", error.message);
  //     }
  //   }
  // };
  //functions
  return (
    <View style={styles.container}>
      {/* Sign In Text */}
      <Text style={styles.signInText}>Sign In</Text>
      <Text style={styles.welcomeText}>
        Hi! Welcome back, you’ve been missed
      </Text>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="**********"
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

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={[styles.signInButton, loading && { opacity: 0.7 }]}
        onPress={loginAcc}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Or sign in with */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Media Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => {
            onGoogleButtonPress();
          }}
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
        Don’t have an account?{" "}
        <Text
          onPress={() => {
            navigation.replace("RegistrationScreen");
          }}
          style={styles.signUpLink}
        >
          Sign Up
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
