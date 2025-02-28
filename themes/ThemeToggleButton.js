import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../themes/ThemedComponents";

const ThemeToggleButton = ({ toggleTheme }) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, isDarkMode ? styles.darkMode : styles.lightMode]}
      onPress={toggleTheme}
    >
      <Text style={styles.buttonText}>{isDarkMode ? "Light Mode" : "Dark Mode"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  darkMode: {
    backgroundColor: "#222",
  },
  lightMode: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default ThemeToggleButton;
