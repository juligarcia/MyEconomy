import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CircularColorButton = ({ colorValue, onPress, selected }) => {
  return (
    <TouchableHighlight style={[styles.icon, selected && styles.selectedIcon]} onPress={onPress} underlayColor="white">
      <FontAwesome size={40} name="circle" color={colorValue} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: '1%',
    paddingLeft: '1%',
    borderRadius: 24
  },
  selectedIcon: {
    backgroundColor: 'white'
  }
})

export default CircularColorButton;