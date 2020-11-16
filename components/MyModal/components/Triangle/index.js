import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

const Triangle = ({ width, height, color = "white", style }) => {
  const styles = StyleSheet.create({
    container: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: width / 2,
      borderRightWidth: width / 2,
      borderBottomWidth: height,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
    }
  });

  return <View style={[styles.container, style]} />;
};

export default Triangle;
