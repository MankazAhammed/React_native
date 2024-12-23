import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Added LinearGradient import

const FitnessEventScreen = () => {
  const navigation = useNavigation();
  const [events] = useState([
    { id: 1, name: 'Yoga for Beginners', date: '2025-3-25', location: 'Central Park' },
    { id: 2, name: 'HIIT Challenge', date: '2025-2-28', location: 'Downtown Gym' },
    { id: 3, name: 'Cycling Marathon', date: '2025-1-30', location: 'Mountain Trails' },
  ]);

  const handleAttend = () => {
    Alert.alert("Ticket Sent", "Ticket is sent to your mail.");
  };

  const handleShareWithFriend = () => {
    // Navigate to ContactsScreen for sharing
    navigation.navigate('ContactsScreen');
  };

  const renderEvent = (event) => {
    return (
      <View style={styles.eventItem} key={event.id}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDetails}>Date: {event.date}</Text>
        <Text style={styles.eventDetails}>Location: {event.location}</Text>
        <Button title="Attend" onPress={handleAttend} color="#FF5722" />
        <Button
          title="Share with a friend"
          onPress={handleShareWithFriend}
          color="#4CAF50"
        />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FF5722', '#FF7043']} // Gradient colors
      style={styles.container}
    >
      <Text style={styles.header}>Fitness Events</Text>
      <Text style={styles.description}>
        Stay active and join our upcoming fitness events to push your limits and achieve your fitness goals. From yoga to high-intensity training, there's something for everyone.
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.map((event) => renderEvent(event))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: "#4b0082",
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    color: "#4b0082",
    fontStyle: "italic"
  },
  scrollContainer: {
    paddingBottom: 20, // Add bottom padding for scrollable content
  },
  eventItem: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  eventDetails: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 5,
  },
});

export default FitnessEventScreen;
