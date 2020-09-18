import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Submit = ({ nextStep }) => {

  return(
    <View style={styles.container}>
      <Button title="Add payment!" color="white" onPress={nextStep} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});

export default Submit;
