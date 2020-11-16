import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import StepCounter from '../StepCounter';
import MyButton from '../MyButton';
import { scaleSize } from '../../aux/dimensions';
import { globalStyles } from '../../aux/globalStyles';

import Steps from './steps';

const NewPayment = ({ addPayment, onClose, incId, nextId }) => {
  const [stepNumber, setStep] = useState(0);
  const [payment, updatePayment] = useState({});
  const [done, setDone] = useState(false);

  const addCreatedPayment = () => {
    addPayment(payment);
    incId();
    onClose();
  };

  const isLastStep = Steps.length - 1 === stepNumber;

  const nextStep = () => {
    if (isLastStep) setDone(true);
    else setStep((prevState) => prevState + 1);
  };

  const Step = Steps[stepNumber];

  const addPaymentData = (data) => {
    updatePayment((prevState) => ({ ...prevState, ...data, key: nextId }));
  };

  useEffect(() => {
    if (done) addCreatedPayment();
  }, [done]);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={[globalStyles.container, { justifyContent: 'flex-end' }]}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Step addPaymentData={addPaymentData} nextStep={nextStep} />
            <StepCounter containerStyle={styles.stepCounter} step={stepNumber} totalSteps={Steps.length} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '87%',
    backgroundColor: '#0E78C2',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    marginTop: scaleSize(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: scaleSize(5),
  },
  stepCounter: {
    bottom: '20%',
  },
});

export default NewPayment;
