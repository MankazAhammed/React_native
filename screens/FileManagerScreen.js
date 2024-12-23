import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient"; // Added LinearGradient import

const FileManagerScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [buttonPosition, setButtonPosition] = useState("center");

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable media library access to pick images."
      );
      console.log("Permission to access gallery was denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
      setButtonPosition("top-right");
    } else {
      console.log("No images selected or action canceled.");
    }
  };

  const handleDeleteImage = (uri) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== uri)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        onPress={() => handleDeleteImage(item)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
    colors={["#FF7E5F", "#FD3A69", "#A224D0"]} // Gradient colors
      style={styles.container}
    >
      <Text style={styles.instructionText}>
        You can upload workout images or workout module images below.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Pick Images" onPress={handleImagePick} color="#ff6347" />
      </View>

      <Text style={styles.detailsText}>
        Select multiple images that you want to upload. Once selected, the
        images will be displayed in a grid. You can delete any image by tapping
        the "Delete" button on the image.
      </Text>

      <FlatList
        data={selectedImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.imageGrid}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#4b0082",
    fontStyle: "italic",
  },
  detailsText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 15,
    color: "#00008b", // Dark blue text color
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#ff6347", // Tomato background for button
    borderRadius: 10,
    overflow: "hidden", // To round the edges
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageGrid: {
    padding: 10,
  },
  imageContainer: {
    position: "relative",
    margin: 10,
    borderRadius: 15,
    borderColor: "#ff6347", // Tomato border for image container
    borderWidth: 2,
    backgroundColor: "#fff", // White background for images
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "#fff", // White border for delete button
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default FileManagerScreen;
