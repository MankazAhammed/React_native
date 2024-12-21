import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [scaleAnimation] = useState(new Animated.Value(1)); // Scale animation for buttons

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission denied");
          return;
        }

        // Fetch current location
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        // Reverse geocode to get address
        const [address] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        // Prepare location string with available data
        const locationString = [
          address.city,
          address.subregion || address.county,
          address.country,
        ]
          .filter((part) => part)
          .join(", ");

        setLocation(locationString);
      } catch (error) {
        setErrorMsg("Error fetching location");
      }
    };

    fetchLocation();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const AnimatedButton = ({ title, onPress }) => (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.animatedButton, { transform: [{ scale: scaleAnimation }] }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <ImageBackground
      source={require("../assets/workout-bg.webp")}
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Muscle Hustle</Text>
        </View>

        {/* Location Info - More Attractive */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            {location || errorMsg || "Fetching..."}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.buttonContainer}>
          <AnimatedButton
            title="Add a Workout"
            onPress={() => navigation.navigate("WorkoutScreen")}
          />
          <View style={styles.spacing} />
          <AnimatedButton
            title="Modify Workout"
            onPress={() => navigation.navigate("ProgressScreen")}
          />
          <View style={styles.spacing} />
          <AnimatedButton
            title="Upload Photos"
            onPress={() => navigation.navigate("FileManagerScreen")}
          />
          <View style={styles.spacing} />
          <AnimatedButton
            title="View Fitness Events"
            onPress={() => navigation.navigate("FitnessEventScreen")}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 FitnessApp | All Rights Reserved</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  locationContainer: {
    position: "absolute",
    top: 100, // Adjusted for better visibility
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  locationText: {
    color: "white",
    fontSize: 16, // Increased font size for better readability
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    marginTop: 20,
  },
  footer: {
    paddingBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 12,
  },
  animatedButton: {
    width: 200, // Set consistent width for buttons
    height: 50,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
