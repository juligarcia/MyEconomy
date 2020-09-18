import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as cardActions from '../../redux/cards/actions';
import Steps from './steps';

const NewCardForm = ({ dispatch, onClose, incId, nextId }) => {

  const [stepNumber, setStep] = useState(0);
  const [card, updateCard] = useState({});

  const nextStep = () => {
    setStep(prevState => prevState + 1);
  };

  const Step = Steps[stepNumber];
  const isLastStep = Steps.length - 1 === stepNumber;

  const addCardData = data => {
    updateCard(prevState => Object.assign({}, prevState, data));
  };

  const createCard = () => {
    dispatch(cardActions.addCard(Object.assign({}, card, { key: nextId })));
    incId();
    onClose();
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: card.color || '#D7D7D7',
      height: '100%',
      width: '100%',
      borderRadius: 10
    }
  });

  return(
    <View style={styles.container}>
      <Step card={card} addCardData={addCardData} nextStep={isLastStep ? createCard : nextStep} />
    </View>
  );
};

export default connect()(NewCardForm);

