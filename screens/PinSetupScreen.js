import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const PinSetupScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handlePinSetup = async () => {
    if (pin.length === 4) {
      // Store the pin securely
      await SecureStore.setItemAsync('userPin', pin);
      navigation.navigate('PinEntry'); // Redirect to Pin Entry screen
    } else {
      Alert.alert('Error', 'Pin must be 4 digits');
    }
  };

  return (
    <View>
      <Text>Set your 4-digit Pin</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Enter Pin"
      />
      <Button title="Save Pin" onPress={handlePinSetup} />
    </View>
  );
};

export default PinSetupScreen;
