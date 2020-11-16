import { useState, useEffect } from 'react'
import { Animated } from 'react-native';
import { screenHeight } from '../aux/dimensions';

export const useKeyboardAwareness = () => {
  [keyboardAnimationdDuration, setKeyboardAnimationDuration] = useState(new Animated.Value(0));
  [bottom, setBottom] = useState(new Animated.Value(0));

  const handleKeyboardWillShow = (event, inputLayout) => {
    Animated.timing(bottom, {
      duration: event.duration,
      toValue: event.endCoordinates.height - (screenHeight - inputLayout.py - inputLayout.height),
      useNativeDriver: false
    }).start();
  };

  const handleKeyboardWillHide = event => {
    Animated.timing(bottom, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: false
    }).start();
  };

  return { handleKeyboardWillHide, handleKeyboardWillShow, bottom };
}