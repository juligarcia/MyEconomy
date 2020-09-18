import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import MyButton from '../../../MyButton';

const BasicPaymentInfo = ({ addPaymentData, nextStep }) => {

  const addBasicInfo = basicInfo => {
    addPaymentData(basicInfo);
  };

  const onSubmit = values => {
    addBasicInfo(values);
    nextStep();
  };

  return (
    <View >
      <Formik
        initialValues={{
          paymentAlias: ''
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#D7D7D7"
              textAlign="center"
              selectionColor="white"
              placeholder="Payment Alias"
              onChangeText={formikProps.handleChange('paymentAlias')}
              value={formikProps.values.paymentAlias}
            />
            <Button
              title="Set Alias!"
              color='white'
              onPress={
                formikProps.values.paymentAlias ? (
                  formikProps.handleSubmit
                ) : (
                  () => alert('No alias')
                )
              }
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: 'white',
    marginBottom: '5%',
    marginTop: '5%',
    fontSize: 20
  }
})

export default BasicPaymentInfo;