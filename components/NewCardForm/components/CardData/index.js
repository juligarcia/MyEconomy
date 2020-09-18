import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import MyLabel from '../../../MyLabel';
import MyButton from '../../../MyButton';
import DateTimePicker from '@react-native-community/datetimepicker';

const CardData = ({ addCardData, nextStep }) => {

  const [date, setDate] = useState(new Date());

  const onSubmit = date => () => {
    addCardData(date);
    nextStep();
  };

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

  return(
    <View style={styles.container}>
      <MyLabel
        text="Card information"
        styles={{
          container: styles.titleContainer, text: styles.title
        }}
      />
      <MyLabel
        text="Select your Card's closing date:"
        styles={{
          container: styles.subtitleContainer, text: styles.subtitle
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
        content="Set closing date!"
        onPress={onSubmit({ closingDate: date })}
        styles={{
          container: styles.button,
          text: styles.buttonContent
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 25
  },
  subtitleContainer: {
    marginBottom: '5%',
  },
  subtitle:{
    fontSize: 15,
    color: 'white',
    fontWeight: '600'
  },
  pickerContainer: {
    paddingTop: '5%',
    paddingBottom: '5%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  picker: {
    width: '100%'
  },
  button: {
    padding: '2%',
    marginTop: '5%',
    backgroundColor: '#D7D7D7',
    borderRadius: 10
  },
  buttonContent: {
    color: 'white',
    fontSize: 20
  }
})

export default CardData;

