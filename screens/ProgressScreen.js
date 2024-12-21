import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as Contacts from "expo-contacts";
import { Share } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";

const ProgressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [workouts, setWorkouts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [totalReps, setTotalReps] = useState(0); // Track total reps
  const [sets, setSets] = useState(0); // Track sets
  const [points, setPoints] = useState(0); // Track points
  const [showConfetti, setShowConfetti] = useState(false); // Confetti animation
  const [showPointAnimation, setShowPointAnimation] = useState(false); // Point animation
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadWorkouts = async () => {
      const savedWorkouts = await AsyncStorage.getItem("workouts");
      if (savedWorkouts) {
        setWorkouts(JSON.parse(savedWorkouts));
      }
    };
    loadWorkouts();
  }, []);

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
    };
    loadContacts();
  }, []);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/achievement.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const triggerAchievement = () => {
    playSound();
    setShowConfetti(true);
    setShowPointAnimation(true);
    setPoints((prevPoints) => prevPoints + 1);

    setTimeout(() => {
      setShowConfetti(false);
      setShowPointAnimation(false);
    },3000);
  };

  const handleFinish = (workout, index) => {
    // Trigger achievement when finish button is clicked for a specific workout
    triggerAchievement();

    // Remove the finished workout from the list
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);

    // Update the state and save to AsyncStorage
    setWorkouts(updatedWorkouts);
    AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  const handleEdit = (workout, index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("WorkoutScreen", {
      workoutToEdit: workout,
      workoutIndex: index,
    });

    setTotalReps(totalReps + workout.reps);
    setSets(sets + workout.sets);
  };

  const handleDelete = async (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);

    await AsyncStorage.setItem("workouts", JSON.stringify(newWorkouts));
    setWorkouts(newWorkouts);
  };

  const handleShareWorkout = async (workout) => {
    try {
      const workoutDetails = `Workout Name: ${workout.workoutName}\nReps: ${workout.reps}\nSets: ${workout.sets}`;
      const result = await Share.share({
        message: workoutDetails,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log("Workout shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share action dismissed");
      }
    } catch (error) {
      alert(`Error sharing workout: ${error.message}`);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutText}>Workout Name: {item.workoutName}</Text>
      <Text style={styles.workoutText}>Reps: {item.reps}</Text>
      <Text style={styles.workoutText}>Sets: {item.sets}</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => handleFinish(item, index)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEdit(item, index)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(index)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShareWorkout(item)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pointsHeader}>Total Points Earned: {points}</Text>

      {workouts.length === 0 ? (
        <Text style={styles.noProgressText}>No added progress</Text>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {showConfetti && (
        <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut={true} />
      )}

      {showPointAnimation && (
        <Animated.View style={[styles.pointAnimation]}>
          <Text style={styles.pointText}>+1 Point!</Text>
        </Animated.View>
      )}
      <View style={styles.addButtonContainer}>
        <Button
          title="Add a Workout"
          onPress={() => navigation.navigate("WorkoutScreen")}
          color="#FF5722"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 FitnessApp | All Rights Reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f8ff",
  },
  pointsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  workoutItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FF7043",
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  workoutText: {
    fontSize: 18,
    color: "#FF5722",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    height: 50,
    width: "23%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  noProgressText: {
    fontSize: 18,
    color: "#BDBDBD",
    textAlign: "center",
  },
  addButtonContainer: {
    marginTop: 30,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#FF5722",
    fontSize: 14,
    textAlign: "center",
  },
  pointText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  pointAnimation: {
    opacity: 1,
    transition: "all 0.3s ease-in-out",
    margin: "5%",
    display: "flex",
    justifyContent: "center"
  },
});

export default ProgressScreen;
