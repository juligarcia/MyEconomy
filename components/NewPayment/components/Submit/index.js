import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MyButton from '../../../MyButton';
import { scaleSize } from '../../../../aux/dimensions';

const Submit = ({ nextStep }) => {

  return(
    <SafeAreaView style={styles.container}>
      <MyButton
        content="Add payment!"
        onPress={nextStep}
        styles={{
          text: styles.submit,
          container: styles.button
        }}
        highlightColor="#258FD9"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  button :{
    padding: '5%',
    borderRadius: 10
  },
  submit: {
    color: 'white',
    textAlign: 'center',
    fontSize: scaleSize(5)
  }
});

export default Submit;
