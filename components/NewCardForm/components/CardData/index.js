import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import MyLabel from '../../../MyLabel';
import MyButton from '../../../MyButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { colorLuminance, isDark } from '../../../../aux/functions';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons';

const CardData = ({ card, addCardData, nextStep }) => {

  const [date, setDate] = useState(new Date());
  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  const onSubmit = date => () => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      addCardData(date);
      nextStep();
    });
  };

  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, []);


  const formatNextMonth = () => {
    const currentDate = new Date();
    const shouldIncreaseYear = currentDate.getMonth() + 1 > 11;
    const nextMonth = new Date().setMonth(
      shouldIncreaseYear ? 0 : currentDate.getMonth() + 1
    );
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

  const colorVariant1 = card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1);
  const colorVariant2 = colorVariant1 && colorLuminance(colorVariant1, isDark(colorVariant1) ? 0.5 : -0.3);

  const styles = StyleSheet.create({
    pickerContainer: {
      paddingTop: '5%',
      paddingBottom: '5%',
      height: '30%',
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 6,
      borderColor: colorVariant1
    },
    picker: {
      height: '100%'
    },
    button: {
      backgroundColor: colorVariant1
    }
  });  

  return(
    <Animated.View style={[globalStyles.container, { left: animatedX }]}>
      <MyLabel
        text="Card information"
        styles={{
          text: globalStyles.title
        }}
      />
      <MyLabel
        text="Select your Card's closing date:"
        styles={{
          container: [globalStyles.titleContainer],
          text: globalStyles.subtitle
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
      <MyButton
        content={
          <MyLabel
            Icon={
              <Octicons
                name="chevron-right"
                size={subtitleFontLarge}
                color="white"
                style={{ marginLeft: '5%' }}
              />
            }
            text="Set closing date"
            styles={{
              text: globalStyles.buttonLabel,
              container: globalStyles.label
            }}
          />
        }
        onPress={onSubmit({ closingDate: date })}
        styles={{
          container: [globalStyles.button, styles.button, globalStyles.buttonLabelContainer],
          text: globalStyles.buttonLabel
        }}
        highlightColor={
          colorVariant2
        }
      />
    </Animated.View>
  )
};

export default CardData;

