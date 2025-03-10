// components/PinInput.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text 
} from 'react-native';

const PinInput = ({ length = 4, onComplete, error }) => {
  const [pin, setPin] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    // Call onComplete when pin length matches required length
    if (pin.length === length) {
      onComplete(pin);
    }
  }, [pin, length, onComplete]);
  
  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Render pin circles (filled or empty)
  const renderPinCircles = () => {
    const circles = [];
    for (let i = 0; i < length; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            pin.length > i && styles.filledCircle,
            error && styles.errorCircle
          ]}
        />
      );
    }
    return circles;
  };

  return (
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={handlePress} 
      style={styles.container}
    >
      <View style={styles.circlesContainer}>
        {renderPinCircles()}
      </View>
      <TextInput
        ref={inputRef}
        value={pin}
        onChangeText={setPin}
        maxLength={length}
        keyboardType="number-pad"
        style={styles.hiddenInput}
        caretHidden
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 10,
  },
  filledCircle: {
    backgroundColor: '#333',
  },
  errorCircle: {
    borderColor: 'red',
    backgroundColor: pin => pin ? 'red' : 'transparent',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

// this project is for post
export default PinInput;
