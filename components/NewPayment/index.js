import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Steps from './steps';
import StepCounter from '../StepCounter';
import MyButton from '../MyButton';
import { AntDesign } from '@expo/vector-icons'; 
import { scaleSize } from '../../aux/dimensions';

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
    if(isLastStep) setDone(true);
    else setStep(prevState => prevState + 1);
  };

  const Step = Steps[stepNumber];

  const addPaymentData = data => {
    updatePayment(prevState => Object.assign({}, prevState, data, { key: nextId }));
  };

  useEffect(() => {
    if (done) addCreatedPayment();
  }, [done])

  return(
    <SafeAreaView style={styles.container}>
      <MyButton
        onPress={onClose}
        styles={{
          container: styles.button
        }}
        content={
          <AntDesign
            style={styles.icon}
            name="close"
            size={scaleSize(7)}
            color="white"
          />
        }
        highlightColor="#258FD9"
      />
      <Step addPaymentData={addPaymentData} nextStep={nextStep} />
      <StepCounter containerStyle={styles.stepCounter} step={stepNumber} totalSteps={Steps.length} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '15%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  stepCounter: {
    bottom: '20%'
  }
})

export default NewPayment;
