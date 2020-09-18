import React from 'react';
import { Text, View } from 'react-native';

const MyLabel = ({ text, styles }) => (
  <View style={styles?.container}>
    <Text style={styles?.text}>{text}</Text>
  </View>
);

export default MyLabel;