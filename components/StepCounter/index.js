import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { scaleSize } from '../../aux/dimensions';

const StepCounter = ({ step, totalSteps, color = '#D7D7D7', containerStyle }) => {
  return(
    <View style={[styles.container, containerStyle]}>
      {new Array(totalSteps).fill(0).map((item, index) => (
        <View key={index} style={styles.step}>
          <MaterialCommunityIcons
            size={index === step ? scaleSize(3) : scaleSize(2)}
            color={color}
            name="checkbox-blank-circle"
          />
        </View>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  step: {
    padding: '2%'
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  }
});

export default StepCounter;
