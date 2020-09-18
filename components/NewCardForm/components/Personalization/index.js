import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import ColorPicker from './components/ColorPicker';

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
          <View>
            <TextInput 
              placeholder="New card name"
              onChangeText={formikProps.handleChange('cardName')}
              value={formikProps.values.cardName}
            />
            <Button title="Personalize!" color='white' onPress={ formikProps.values.cardName ? formikProps.handleSubmit : () => alert('No card name entered')} />
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
    height: '100%'
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
  }
})

export default Personalization;

