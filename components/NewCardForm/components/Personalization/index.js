import React, { useState } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { AntDesign, Octicons } from '@expo/vector-icons';

import MyButton from '../../../MyButton';
import MyLabel from '../../../MyLabel';
import MyTextInput from '../../../MyTextInput';
import { getLuminance } from '../../../../aux/functions';
import { titleFont, subtitleFontLarge } from '../../../../aux/dimensions';
import { useKeyboardAwareness } from '../../../../aux/hooks';
import { globalStyles } from '../../../../aux/globalStyles';
import { Slide } from '../../../../aux/animations';
import { useTheme } from '../../../../theme/ThemeProvider';

import ColorPicker from './components/ColorPicker';

const Personalization = ({ addCardData, nextStep, card }) => {
  const [submit, setSubmit] = useState({ dismount: false });
  const { bottom, handleKeyboardWillHide, handleKeyboardWillShow } = useKeyboardAwareness();
  const { isDark: isDarkMode, colors } = useTheme();
  const cardColor = colors.cardColors[card.color];

  const setColor = (color) => {
    addCardData({ color });
  };

  const onSubmit = (values) => setSubmit({ dismount: true, values });

  const onDismountCallback = () => {
    addCardData(submit.values);
    nextStep();
  };

  const colorVariant1 = cardColor && getLuminance(cardColor, isDarkMode)
  const colorVariant2 = colorVariant1 && getLuminance(colorVariant1, isDarkMode)

  const styles = StyleSheet.create({
    container: {
      padding: '10%'
    },
    title: {
      marginRight: '5%',
    },
    formContainer: {
      alignItems: 'center',
    },
    button: {
      backgroundColor: colorVariant1,
    },
    textInput: {
      borderColor: colorVariant1 || '#D7D7D7',
      borderWidth: 4,
      borderRadius: 10,
      padding: '2%',
    },
    colorPicker: {
      backgroundColor: colorVariant1,
      padding: '5%',
      borderRadius: 100,
    },
  });

  return (
    <Slide onDismountCallback={onDismountCallback} dismount={submit.dismount}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={[globalStyles.centered, styles.container, { bottom }]}>
          <MyLabel
            text="My New Card"
            styles={{
              text: [globalStyles.title, styles.title],
              container: [globalStyles.titleContainer],
            }}
            Icon={<AntDesign color="white" name="form" size={titleFont} />}
          />
          <ColorPicker
            selectedColor={cardColor}
            highlightColor={colorVariant2}
            setColor={setColor}
            containerStyle={styles.colorPicker}
          />
          <Formik
            initialValues={{
              cardName: '',
            }}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
              <View style={styles.formContainer}>
                <MyTextInput
                  handleKeyboardWillHide={handleKeyboardWillHide}
                  handleKeyboardWillShow={handleKeyboardWillShow}
                  style={styles.textInput}
                  placeholder="New card name"
                  onChangeText={formikProps.handleChange('cardName')}
                  value={formikProps.values.cardName}
                />
                <MyButton
                  onPress={
                    !formikProps.values.cardName
                      ? () => alert('No card name entered')
                      : !cardColor
                      ? () => alert('No color selected')
                      : formikProps.handleSubmit
                  }
                  content={(
                    <MyLabel
                      Icon={(
                        <Octicons
                          name="chevron-right"
                          size={subtitleFontLarge}
                          color="white"
                          style={{ marginLeft: '5%' }}
                        />
                      )}
                      text="Personalize"
                      styles={{
                        text: globalStyles.buttonLabel,
                        container: [globalStyles.label, globalStyles.buttonLabelContainer],
                      }}
                    />
                  )}
                  styles={{
                    container: [globalStyles.button, styles.button],
                  }}
                  highlightColor={colorVariant2}
                />
              </View>
            )}
          </Formik>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Slide>
  );
};

export default Personalization;
