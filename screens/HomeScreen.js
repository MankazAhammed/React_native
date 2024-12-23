import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

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
        console.log("Address data:", address);

        let locationString = [
          address.city,
          address.region || address.county,
          address.country,
        ]
          .filter((part) => part) // Filter out any empty parts
          .join(", ");

        // If no valid location information, fallback to formatted address
        if (
          !locationString ||
          address.city === null ||
          address.county === null ||
          address.country === null
        ) {
          locationString = address.formattedAddress || "Address not available";
        }

        setLocation(locationString);
      } catch (error) {
        setErrorMsg("Error fetching location");
        console.error(error); // Log any error to the console
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
      <Animated.View
        style={[
          styles.animatedButton,
          { transform: [{ scale: scaleAnimation }] },
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <LinearGradient
      colors={["#FF7E5F", "#FD3A69", "#A224D0"]} // Gradient with vibrant colors
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to The Muscle Hustle</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Location: {location || errorMsg || "Fetching..."}
          </Text>
        </View>

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
          <Text style={styles.footerText}>
            © 2024 FitnessApp | All Rights Reserved
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    top: 100,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
  },  
  locationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
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
