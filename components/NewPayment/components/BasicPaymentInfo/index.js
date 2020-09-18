import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const BasicPaymentInfo = ({ addPaymentData, nextStep }) => {

  const addBasicInfo = basicInfo => {
    addPaymentData(basicInfo);
  };

  const onSubmit = values => {
    addBasicInfo(values);
    nextStep();
  };

  return (
    <View>
      <Formik
        initialValues={{
          paymentAlias: ''
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View>
            <TextInput 
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

export default BasicPaymentInfo;