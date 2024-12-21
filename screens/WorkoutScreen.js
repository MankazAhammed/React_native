import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";

const WorkoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const { workoutToEdit, workoutIndex } = route.params || {};

  useEffect(() => {
    if (workoutToEdit) {
      setWorkoutName(workoutToEdit.workoutName);
      setReps(workoutToEdit.reps);
      setSets(workoutToEdit.sets);
    }
  }, [workoutToEdit]);

  const handleSave = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const newWorkout = { workoutName, reps, sets };
    let workouts = await AsyncStorage.getItem("workouts");
    workouts = workouts ? JSON.parse(workouts) : [];

    if (workoutToEdit) {
      workouts[workoutIndex] = newWorkout;
    } else {
      workouts.push(newWorkout);
    }

    await AsyncStorage.setItem("workouts", JSON.stringify(workouts));
    navigation.navigate("ProgressScreen", { updatedWorkouts: workouts });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.headerText}>Workout Details</Text>
      <Text style={styles.descriptionText}>
        Enter the details of your workout below. You can add a new workout or
        edit an existing one.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <TextInput
        style={styles.input}
        placeholder="Reps (numeric)"
        value={reps ? String(reps) : ""}
        onChangeText={setReps}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sets (numeric)"
        value={sets ? String(sets) : ""}
        onChangeText={setSets}
        keyboardType="numeric"
      />
      <Button
        title={workoutToEdit ? "Edit Workout" : "Add Workout"}
        onPress={handleSave}
        color="#4CAF50" // Using the same color as before, or you can customize
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 FitnessApp | All Rights Reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
  },
  input: {
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
    shadowColor: "#000", // Adding shadow for a subtle effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#FF5722",
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    paddingTop: 10,
    paddingBottom: 20,
  },
  footerText: {
    color: "#4CAF50",
    fontSize: 12,
  },
});

export default WorkoutScreen;
