import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Switch, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';
import MyLabel from '../../../MyLabel';
import MyButton from '../../../MyButton';

const TotalAndInstalments = ({ addPaymentData, nextStep }) => {

  const [instalments, setInstalments] = useState('1');
  const [monthly, setMonthly] = useState(false);

  const toggleMonthly = () => {
    setInstalments('1');
    setMonthly(!monthly);
  };

  const maxInstalment = 36;

  const onSubmit = values => {
    addPaymentData({...values, monthly, instalments});
    nextStep();
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          paymentTotal: ''
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View style={{ justifyContent: 'flex-end' }}>
            <TextInput
              placeholderTextColor="#D7D7D7"
              textAlign="center"
              selectionColor="white"
              style={styles.textInput}
              keyboardType='numeric'
              placeholder="Total payment amount"
              onChangeText={formikProps.handleChange('paymentTotal')}
              value={formikProps.values.paymentTotal}
            />
            <MyLabel
              text="How many instalments?"
              styles={{
                container: styles.labelContainer,
                text: styles.label
              }}
            />
            <Picker
              selectedValue={instalments}
              onValueChange={selected => setInstalments(selected)}
              itemStyle={styles.pickerItem}
            >
              {!monthly ? (
                new Array(maxInstalment).fill(0).map((item, index) => <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />)
              ) : (
                <Picker.Item key={1} label='1' value='1' />
              )}
            </Picker>
            <View style={styles.switch}>
              <MyLabel
                text="Monthly payment?"
                styles={{
                  container: styles.monthlyLabel,
                  text: styles.label
                }}
              />
              <Switch
                ios_backgroundColor='#D7D7D7'
                onValueChange={toggleMonthly}
                value={monthly}
              />
            </View>
            <MyButton
              content="Add payment!"
              onPress={
                formikProps.values.paymentTotal ? (
                  formikProps.handleSubmit
                ) : (
                  () => alert('You forgot to enter an amount!')
                )
              }
              styles={{
                text: styles.buttonText,
                container: styles.button
              }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    color: 'white'
  },
  textInput: {
    marginBottom: '10%',
    color: 'white',
    fontSize: 20,
  },
  label: {
    color: '#D7D7D7',
    fontSize: 15,
    textAlign: 'center',
  },
  labelContainer: {
    marginBottom: '5%'
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    marginTop: '5%',
    borderRadius: 10,
    width: '100%'
  },
  buttonText: {
    padding:10,
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  switch: {
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthlyLabel: {
    marginRight: '5%'
  }
})

export default TotalAndInstalments;