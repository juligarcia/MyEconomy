import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';

const TotalAndInstalments = ({ addPaymentData, nextStep }) => {

  const [instalments, setInstalments] = useState('0');

  const maxInstalment = 36;

  const onSubmit = values => {
    addPaymentData(values);
    nextStep();
  };

  return (
    <View>
      <Formik
        initialValues={{
          paymentTotal: '',
          initialInstalments: instalments
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View>
            <TextInput
              keyboardType='numeric'
              placeholder="Total payment amount"
              onChangeText={formikProps.handleChange('paymentTotal')}
              value={formikProps.values.paymentTotal}
            />
            <Picker
              selectedValue={instalments}
              onValueChange={selected => setInstalments(selected)}
              style={styles.picker}
            >
              {new Array(maxInstalment).fill(0).map((item, index) => <Picker.Item label={`${index + 1}`} value={`${index + 1}`} />)}
            </Picker>
            <Button
              title="Add payment!"
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
  picker: {
    color: 'white',
    width: '100%',
    height: '70%'
  }
})

export default TotalAndInstalments;