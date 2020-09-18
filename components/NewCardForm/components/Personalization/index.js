import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import ColorPicker from './components/ColorPicker';
import MyButton from '../../../MyButton';

const colors = {
  red: '#EF3939',
  blue: '#33ADFF',
  green: '#80D455',
  gold: '#EBC352',
  black: '#242424',
  platinum: '#ADBBCF',
  turquoise: '#37DAC1'
};

const Personalization = ({ addCardData, nextStep, card }) => {

  const setColor = color => {
    addCardData({ color });
  };

  const onSubmit = values => {
    addCardData(values);
    nextStep();
  };

  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My New Card</Text>
        <AntDesign color="white" name="form" size={20} />
      </View>
      <ColorPicker selectedColor={card.color} colors={colors} setColor={setColor} />
      <Formik
        initialValues={{
          cardName: ''
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="white"
              textAlign="center"
              selectionColor="white"
              placeholder="New card name"
              onChangeText={formikProps.handleChange('cardName')}
              value={formikProps.values.cardName}
            />
            <MyButton
              onPress={
                formikProps.values.cardName ? (
                  formikProps.handleSubmit
                ) : (
                  () => alert('No card name entered')
                )
              }
              content="Personalize!"
              styles={{
                content: styles.buttonContent,
                text: styles.buttonLabel,
                container: styles.button
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginBottom: '5%',
    fontWeight: '600',
    fontSize: 25
  },
  textInput: {
    color: 'white',
    marginBottom: '5%',
    marginTop: '5%',
    fontSize: 20
  },
  buttonLabel: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  buttonContent: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white'
  },
  button: {
    width: '50%',
    marginTop: '10%',
    borderRadius: 10
  },
  formContainer: {
    alignItems: 'center'
  }
})

export default Personalization;

