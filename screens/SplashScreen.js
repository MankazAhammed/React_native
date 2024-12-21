import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text, Animated } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(onFinish, 1500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash-logo.webp")}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Muscle Hustle</Text>
      <Text style={styles.tagline}>Fitness Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5722",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});

export default SplashScreen;