import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Formik } from 'formik';
import MyButton from '../../../MyButton';
import MyLabel from '../../../MyLabel';
import { screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons';

const BasicPaymentInfo = ({ addPaymentData, nextStep }) => {

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  const addBasicInfo = basicInfo => {
    addPaymentData(basicInfo);
  };

  const onSubmit = values => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      addBasicInfo(values);
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

  return (
    <Animated.View style={[globalStyles.container, { left: animatedX }]}>
      <SafeAreaView style={globalStyles.container}>
        <Formik
          initialValues={{
            paymentAlias: ''
          }}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={[globalStyles.textInput, styles.textInput]}
                placeholderTextColor="#D7D7D7"
                textAlign="center"
                selectionColor="white"
                placeholder="Payment Alias"
                onChangeText={formikProps.handleChange('paymentAlias')}
                value={formikProps.values.paymentAlias}
              />
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
                    text="Set alias"
                    styles={{
                      text: [globalStyles.buttonLabel, styles.buttonLabel, globalStyles.buttonLabelContainer],
                      container: globalStyles.label
                    }}
                  />
                }
                onPress={
                  formikProps.values.paymentAlias ? (
                    formikProps.handleSubmit
                  ) : (
                    () => alert('No alias')
                  )
                }
                styles={{
                  container: [globalStyles.button, styles.button]
                }}
                highlightColor="#086CB2"
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#258FD9'
  },
  buttonLabel: {
    marginRight: '5%'
  },
  textInput: {
    padding: '2%',
    borderWidth: 4,
    borderColor: '#258FD9',
    borderRadius: 10
  }
})

export default BasicPaymentInfo;