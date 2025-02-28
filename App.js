import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

import CameraComponent from "./screens/CameraComponent";
import {
  ThemedView,
  ThemedText,
  ThemeProvider,
} from "./themes/ThemedComponents";
import store from "./redux/store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

function PostTabScreen({ navigation }) {
  const [open, setOpen] = useState(false); // Track the state of the FAB
  const [image, setImage] = useState(null); // Store the selected image
  const [video, setVideo] = useState(null); // Store the selected video
  const [description, setDescription] = useState(""); // Store the description

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickMedia = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow both images and videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Media Picker Result:", result); // Log the entire result

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.type === "image") {
          console.log("Selected Image URI:", asset.uri);
          setImage(asset.uri);
          setVideo(null); // Clear video if an image is selected
        } else if (asset.type === "video") {
          console.log("Selected Video URI:", asset.uri);
          setVideo(asset.uri);
          setImage(null); // Clear image if a video is selected
        }
      } else {
        console.log("Media selection was cancelled or no assets found");
      }
    } catch (error) {
      console.error("Error picking media:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Post Tab Screen</ThemedText>

      {/* Display selected image or video */}
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      {video && (
        <Video
          source={{ uri: video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={styles.videoPreview}
        />
      )}

      {/* Input for description */}
      <TextInput
        style={styles.input}
        placeholder="What's on Your Mind ?"
        multiline
        numberOfLines={6}
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top" // Align text to the top of the input field
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle the image, video, and description as needed
          if (image) {
            console.log("Image:", image);
          } else if (video) {
            console.log("Video:", video);
          }
          console.log("Description:", description);
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Floating Action Button (FAB) */}
      <FAB
        style={styles.fab}
        icon={open ? "close" : "plus"}
        open={open}
        onPress={() => setOpen(!open)}
      />

      {/* Hidden action buttons when FAB is pressed */}
      {open && (
        <ThemedView style={styles.fabActions}>
          <FAB
            size="small"
            icon="camera"
            onPress={() => navigation.navigate("Camera")}
            style={styles.fabAction}
          />
          <FAB
            size="small"
            icon="image-album"
            onPress={pickMedia}
            style={styles.fabAction}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="PostTabScreen"
              component={PostTabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraComponent}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light background color for modern look
  },
  title: {
    fontSize: 28, // Larger font size
    fontWeight: "bold", // Bold text
    color: "#333", // Darker color for contrast
    marginBottom: 20,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 20,
    borderRadius: 15, // More rounded corners
    borderWidth: 2,
    borderColor: "#ddd", // Light border color
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Enhanced shadow for Android
  },
  videoPreview: {
    width: "80%",
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: "80%",
    height: 120, // Adjust height for 6 lines
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc", // Light gray border
    borderRadius: 8,
    backgroundColor: "#fff", // White background for the input field
    fontSize: 16,
    color: "#333", // Dark text color
    textAlignVertical: "top", // Align text at the top
    shadowColor: "#000", // Adding subtle shadow for better focus
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  fabActions: {
    position: "absolute",
    bottom: 80,
    right: 16,
  },
  fabAction: {
    marginBottom: 10,
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 25, // Rounded corners
    backgroundColor: "#6A1B9A", // Primary color
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});
