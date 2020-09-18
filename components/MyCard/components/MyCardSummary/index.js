import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyCardSummary = ({ cardInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{cardInfo}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  text: {
    color: "#fff"
  }
});


export default MyCardSummary;