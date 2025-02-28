import React, { createContext, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './ThemeToggleButton';
const ThemeContext = createContext();

const lightTheme = {
  background: '#F5F5F5',
  text: '#333333',
  inputBackground: '#FFFFFF',
  inputBorder: '#DDDDDD',
  buttonBackground: '#6A1B9A',
  buttonText: '#FFFFFF',
  label: '#666666',
};

const darkTheme = {
  background: '#121212',
  text: '#E0E0E0',
  inputBackground: '#1E1E1E',
  inputBorder: '#333333',
  buttonBackground: '#BB86FC',
  buttonText: '#121212',
  label: '#AAAAAA',
};

export const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export const ThemedView = ({ children, style }) => {
  const { theme } = useTheme();
  return <View style={[styles.view, { backgroundColor: theme.background }, style]}>{children}</View>;
};

export const ThemedText = ({ children, style }) => {
  const { theme } = useTheme();
  return <Text style={[styles.text, { color: theme.text }, style]}>{children}</Text>;
};

export const ThemedInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const { theme } = useTheme();
  return (
    <TextInput
      style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}
      placeholder={placeholder}
      placeholderTextColor={theme.label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export const ThemedButton = ({ title, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  return (
    <TouchableOpacity style={styles.toggleButton} onPress={() => dispatch(toggleTheme())}>
      <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#6A1B9A',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
