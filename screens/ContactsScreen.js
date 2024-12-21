import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
      }
    })();
  }, []);

  const handleShareContact = (contact) => {
    Alert.alert('Share Event', `Event shared with ${contact.name}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Contact</Text>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text style={styles.contactName}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleShareContact(item)}>
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noContacts}>No contacts found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FF5722',
  },
  contactItem: {
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    color: '#FF5722',
  },
  shareText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 5,
  },
  noContacts: {
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  },
});

export default ContactsScreen;
