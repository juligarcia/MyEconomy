import React from 'react';
import { Text, View } from 'react-native';

const MyLabel = ({ text, styles = {}, Icon, before = false, both }) => (
  <View style={styles.container}>
    {(before || both) && Icon}
    <Text style={styles.text}>{text}</Text>
    {(!before || both) && Icon}
  </View>
);

export default MyLabel;