import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Steps from './steps';

const NewPayment = ({ addPayment }) => {

  const [stepNumber, setStep] = useState(0);
  const [payment, updatePayment] = useState({});

  const addCreatedPayment = () => {
    addPayment(payment);
  };

  const nextStep = () => {
    setStep(prevState => prevState + 1);
  };

  const Step = Steps[stepNumber];
  const isLastStep = Steps.length - 1 === stepNumber;

  const addPaymentData = data => {
    updatePayment(prevState => Object.assign({}, prevState, data));
  };

  return(
    <View style={styles.container}>
      <Step addPaymentData={addPaymentData} nextStep={isLastStep ? addCreatedPayment : nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: '100%'
  }
})

export default NewPayment;
