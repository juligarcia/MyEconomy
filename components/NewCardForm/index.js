import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as cardActions from '../../redux/cards/actions';
import Steps from './steps';
import StepCounter from '../StepCounter';
import MyButton from '../MyButton';
import { AntDesign } from '@expo/vector-icons'; 
import { scaleSize } from '../../aux/dimensions';
import { colorLuminance, isDark } from '../../aux/functions';

const NewCardForm = ({ dispatch, onClose, incId, nextId }) => {

  const [stepNumber, setStep] = useState(0);
  const [card, updateCard] = useState({});
  const [done, setDone] = useState(false);

  const isLastStep = Steps.length - 1 === stepNumber;

  const nextStep = () => {
    if (isLastStep) setDone(true);
    else setStep(prevState => prevState + 1);
  };

  const Step = Steps[stepNumber];

  const addCardData = data => {
    updateCard(prevState => Object.assign({}, prevState, data));
  };

  const createCard = () => {
    dispatch(cardActions.addCard(Object.assign({}, card, { key: nextId })));
    incId();
    onClose();
  };

  useEffect(() => {
    if(done)
      createCard();
  }, [done])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: card.color || '#D7D7D7',
      height: '100%',
      width: '100%',
      borderRadius: 10
    },
    button: {
      position: 'absolute',
      zIndex: 1,
      marginTop: '10%',
      marginLeft: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
    },
    stepCounter: {
      bottom: '20%'
    }
  });

  return(
    <View style={styles.container}>
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
        highlightColor={card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1)}
      />
      <Step card={card} addCardData={addCardData} nextStep={nextStep} />
      <StepCounter
        step={stepNumber}
        totalSteps={Steps.length}
        color={card.color && colorLuminance(card.color, isDark(card.color) ? 1 : -0.3)}
        containerStyle={styles.stepCounter} />
    </View>
  );
};

export default connect()(NewCardForm);

