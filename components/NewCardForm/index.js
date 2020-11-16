import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import * as cardActions from '../../redux/cards/actions';
import StepCounter from '../StepCounter';
import MyHelp from '../MyHelp';
import MyLabel from '../MyLabel';
import { scaleSize } from '../../aux/dimensions';
import { colorLuminance, isDark } from '../../aux/functions';
import { AnimatedBackgroundView } from '../../aux/animations';
import { globalStyles } from '../../aux/globalStyles';
import { useTheme } from '../../theme/ThemeProvider';

import { help } from './constants';
import Steps from './steps';

const NewCardForm = ({ dispatch, onClose, incId, nextId }) => {
  const [stepNumber, setStep] = useState(0);
  const [card, updateCard] = useState({});
  const [done, setDone] = useState(false);
  const isLastStep = Steps.length - 1 === stepNumber;
  const { colors } = useTheme();
  const cardColor = colors.cardColors[card.color];

  const nextStep = () => {
    if (isLastStep) setDone(true);
    else setStep((prevState) => prevState + 1);
  };

  const Step = Steps[stepNumber];

  const addCardData = (data) => {
    updateCard((prevState) => ({ ...prevState, ...data }));
  };

  const createCard = () => {
    dispatch(cardActions.addCard({ ...card, key: nextId }));
    incId();
    onClose();
  };

  useEffect(() => {
    if (done) createCard();
  }, [done]);

  return (
    <View style={{ justifyContent: 'flex-end', height: scaleSize(90, true) }}>
      <MyHelp
        spaceBetween={1}
        buttonStyle={styles.help}
        content={(
          <MyLabel
            text={help[stepNumber]}
            styles={{
              text: [globalStyles.smallSubtitle, styles.helpContent],
            }}
          />
        )}
      />
      <AnimatedBackgroundView initialColor={colors.foreground2} style={styles.container} actualColor={cardColor}>
        <Step card={card} addCardData={addCardData} nextStep={nextStep} />
        <StepCounter
          step={stepNumber}
          totalSteps={Steps.length}
          color={cardColor && colorLuminance(cardColor, isDark(cardColor) ? 1 : -0.3)}
          containerStyle={styles.stepCounter}
        />
      </AnimatedBackgroundView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleSize(90, true),
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
  },
  button: {
    marginLeft: scaleSize(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  stepCounter: {
    position: 'absolute',
    bottom: 0,
  },
  help: {
    marginRight: scaleSize(5),
    zIndex: 1,
    top: scaleSize(4, true),
    left: scaleSize(3),
  },
  helpContent: {
    color: 'gray',
  },
});

export default connect()(NewCardForm);
