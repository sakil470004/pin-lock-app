// utils/secureStorage.js
import * as SecureStore from 'expo-secure-store';

const PIN_KEY = 'user_pin';
const IS_PIN_SET_KEY = 'is_pin_set';

// Save the user's PIN securely
export const savePin = async (pin) => {
  try {
    await SecureStore.setItemAsync(PIN_KEY, pin);
    await SecureStore.setItemAsync(IS_PIN_SET_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Error saving PIN:', error);
    return false;
  }
};

// Check if PIN has been set
export const isPinSet = async () => {
  try {
    const result = await SecureStore.getItemAsync(IS_PIN_SET_KEY);
    return result === 'true';
  } catch (error) {
    console.error('Error checking if PIN is set:', error);
    return false;
  }
};

// Get the saved PIN
export const getPin = async () => {
  try {
    return await SecureStore.getItemAsync(PIN_KEY);
  } catch (error) {
    console.error('Error retrieving PIN:', error);
    return null;
  }
};

// Validate entered PIN against stored PIN
export const validatePin = async (enteredPin) => {
  try {
    const storedPin = await getPin();
    return storedPin === enteredPin;
  } catch (error) {
    console.error('Error validating PIN:', error);
    return false;
  }
};
