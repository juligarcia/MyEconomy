import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MyLabel from '../../../MyLabel';

const MyCardBar = ({ cardName, closingDate }) => {

  const formatDate = date => (
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  )

  return (
    <View style={styles.container}>
      <MyLabel text={cardName} styles={{ text: styles.text }} />
      {<MyLabel text={`Closing date: ${formatDate(closingDate)}`} styles={{ text: styles.text }} />}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: "#fff",
    fontWeight: '700'
  }
});


export default MyCardBar;