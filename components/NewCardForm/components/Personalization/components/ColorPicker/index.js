import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import CircularColorButton from './components/CircularColorButton';

const ColorPicker = ({ colors, setColor, selectedColor }) => {

  const colorLabels = Object.keys(colors);
  const colorValues = Object.values(colors);

  const setPickedColor = colorLabel => () => {
    setColor(colorLabel);
  };

  return (
    <View style={styles.container}>
      {colorValues.map((colorValue, index) => (
        <CircularColorButton key={index} selected={selectedColor == colorValue} colorValue={colorValue} onPress={setPickedColor(colorValue)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
})

export default ColorPicker;