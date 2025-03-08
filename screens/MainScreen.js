// screens/MainScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const MainScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // In a real app, you might want to implement actual logout logic
    // For this example, we'll just navigate back to PIN entry
    navigation.replace('PinEntry');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.subtitle}>
        You have successfully authenticated with your PIN.
      </Text>
      
      <View style={styles.content}>
        <Text style={styles.contentText}>
          This is the protected content of your application.
          Only users who enter the correct PIN can see this.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Lock App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;