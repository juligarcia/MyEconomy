import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons } from '@expo/vector-icons';
import MyLabel from '../../../MyLabel';
import MyTextInput from '../../../MyTextInput';
import MyButton from '../../../MyButton';
import { screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { colorLuminance, isDark, getLuminance } from '../../../../aux/functions';
import { globalStyles } from '../../../../aux/globalStyles';
import { useKeyboardAwareness } from '../../../../aux/hooks';
import { useTheme } from '../../../../theme/ThemeProvider';


const CardData = ({ card, addCardData, nextStep }) => {
  const [date, setDate] = useState(new Date());
  const animatedX = useRef(new Animated.Value(screenWidth)).current;
  const { bottom, handleKeyboardWillHide, handleKeyboardWillShow } = useKeyboardAwareness();
  const { colors, isDark: isDarkMode } = useTheme();
  const cardColor = colors.cardColors[card.color];

  const onSubmit = (date) => (values) => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      addCardData(date);
      addCardData({ cardLimit: values.cardLimit });
      nextStep();
    });
  };

  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const formatNextMonth = () => {
    const currentDate = new Date();
    const shouldIncreaseYear = currentDate.getMonth() + 1 > 11;
    const nextMonth = new Date().setMonth(shouldIncreaseYear ? 0 : currentDate.getMonth() + 1);
    return new Date(nextMonth).setFullYear(
      shouldIncreaseYear ? currentDate.getFullYear() + 1 : currentDate.getFullYear()
    );
  };

  const formatMinimumDate = () => {
    const currentDate = new Date();
    return new Date().setDate(currentDate.getDate() + 1);
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  //const colorVariant1 = card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1);
  //const colorVariant2 = colorVariant1 && colorLuminance(colorVariant1, isDark(colorVariant1) ? 0.5 : -0.3);

  const colorVariant1 = cardColor && getLuminance(cardColor, isDarkMode)
  const colorVariant2 = colorVariant1 && getLuminance(colorVariant1, isDarkMode)

  const styles = StyleSheet.create({
    pickerContainer: {
      paddingTop: '5%',
      paddingBottom: '5%',
      height: '30%',
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 6,
      borderColor: colorVariant1,
    },
    picker: {
      height: '100%',
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
    formContainer: {
      alignItems: 'center',
    },
  });

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={[globalStyles.centered, { left: animatedX, bottom }]}>
          <MyLabel
            text="Card information"
            styles={{
              text: globalStyles.title,
            }}
          />
          <MyLabel
            text="Select your Card's closing date:"
            styles={{
              container: [globalStyles.titleContainer],
              text: globalStyles.subtitle,
            }}
          />
          <View style={styles.pickerContainer}>
            <DateTimePicker
              style={styles.picker}
              value={date}
              minimumDate={formatMinimumDate()}
              maximumDate={formatNextMonth()}
              onChange={onChange}
            />
          </View>
          <Formik
            initialValues={{
              cardLimit: '',
            }}
            onSubmit={onSubmit({ closingDate: date })}
          >
            {(formikProps) => (
              <View style={styles.formContainer}>
                <MyTextInput
                  handleKeyboardWillHide={handleKeyboardWillHide}
                  handleKeyboardWillShow={handleKeyboardWillShow}
                  keyboardType="numeric"
                  style={styles.textInput}
                  placeholder="Card's limit"
                  onChangeText={formikProps.handleChange('cardLimit')}
                  value={formikProps.values.cardLimit}
                />
                <MyButton
                  content={(
                    <MyLabel
                      Icon={
                        <Octicons
                          name="chevron-right"
                          size={subtitleFontLarge}
                          color="white"
                          style={{ marginLeft: '5%' }}
                        />
                      }
                      text="Set information"
                      styles={{
                        text: globalStyles.buttonLabel,
                        container: globalStyles.label,
                      }}
                    />
                  )}
                  onPress={
                    !formikProps.values.cardLimit
                      ? () => alert('No card limit set')
                      : formikProps.handleSubmit
                  }
                  styles={{
                    container: [globalStyles.button, styles.button, globalStyles.buttonLabelContainer],
                    text: globalStyles.buttonLabel,
                  }}
                  highlightColor={colorVariant2}
                />
              </View>
            )}
          </Formik>
        </Animated.View>
      </TouchableWithoutFeedback>
  );
};

export default CardData;
