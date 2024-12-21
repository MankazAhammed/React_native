import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FitnessEventScreen = () => {
  const navigation = useNavigation();
  const [events] = useState([
    { id: 1, name: 'Yoga for Beginners', date: '2024-12-25', location: 'Central Park' },
    { id: 2, name: 'HIIT Challenge', date: '2024-12-28', location: 'Downtown Gym' },
    { id: 3, name: 'Cycling Marathon', date: '2024-12-30', location: 'Mountain Trails' },
  ]);

  const handleAttend = () => {
    Alert.alert("Ticket Sent", "Ticket is sent to your mail.");
  };

  const handleShareWithFriend = () => {
    // Navigate to ContactsScreen Screen for sharing
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
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Fitness Events</Text>
      {events.map((event) => renderEvent(event))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF5722',
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
