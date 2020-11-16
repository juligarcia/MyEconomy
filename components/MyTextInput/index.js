import React, { useState, useEffect, useRef, useReducer } from 'react';
import { TextInput, Keyboard, View } from 'react-native';
import { globalStyles } from '../../aux/globalStyles';
import { screenHeight } from '../../aux/dimensions';

const MyTextInput = ({
  keyboardType,
  placeholderTextColor = 'white',
  style,
  selectionColor = 'white',
  placeholder,
  onChangeText,
  value,
  handleKeyboardWillShow = () => {},
  handleKeyboardWillHide = () => {},
  withCheck = true
}) => {
  const inputRef = useRef(null);
  const [inputLayout, setInputLayout] = useState({ height: 0, width: 0, py: 0 });
  const [keyboardEvent, setKeyboardEvent] = useState({});
  const [keyboardWillShow, setWillShow] = useState(false);

  const shouldAdjust = () => {
    if(withCheck)
      return keyboardEvent?.endCoordinates?.height > (screenHeight - inputLayout.py - inputLayout.height);
    else
      return true;
  }

  const willShow = event => {
    setWillShow(true);
    setKeyboardEvent(event);
  }

  const willHide = event => {
    setWillShow(false);
    setKeyboardEvent(event);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', willShow);
    Keyboard.addListener('keyboardWillHide', willHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', willShow);
      Keyboard.removeListener('keyboardWillHide', willHide);
    };
  }, []);

  useEffect(() => {
    if(inputRef)
      inputRef.current.measure(
        (fx, fy, width, height, px, py) => {
          setInputLayout({ height, py, width });
        }
      );
  }, [inputRef]);

  useEffect(() => {
    if(keyboardEvent !== {} && shouldAdjust()){
      if(keyboardWillShow){
        handleKeyboardWillShow(keyboardEvent, inputLayout);
      }
      else
        handleKeyboardWillHide(keyboardEvent);
    }
  }, [keyboardEvent]);

  return (
    <View ref={inputRef}>
      <TextInput
        autoCorrect={false}
        autoCompleteType="off"
        style={[globalStyles.textInput, style]}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        textAlign="center"
        selectionColor={selectionColor}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default MyTextInput;