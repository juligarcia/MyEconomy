import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { scaleSize } from '../../../../../../../../aux/dimensions';


const CircularColorButton = ({ colorValue, onPress, selected, highlightColor }) => {

  const styles = StyleSheet.create({
    icon: {
      borderRadius: 24
    },
    selectedIcon: {
      backgroundColor: highlightColor || 'white'
    }
  });

  return (
    <TouchableHighlight
      style={[styles.icon, selected && styles.selectedIcon]}
      onPress={onPress}
      underlayColor={highlightColor || 'white'}
    >
      <MaterialCommunityIcons size={scaleSize(10)} name="checkbox-blank-circle" color={colorValue} />
    </TouchableHighlight>
  );
};

export default CircularColorButton;