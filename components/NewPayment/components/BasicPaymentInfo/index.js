import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import MyButton from '../../../MyButton';
import MyLabel from '../../../MyLabel';
import MyTextInput from '../../../MyTextInput';
import { screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { useKeyboardAwareness } from '../../../../aux/hooks';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons';

const BasicPaymentInfo = ({ addPaymentData, nextStep }) => {
  const { 
    bottom,
    handleKeyboardWillHide, 
    handleKeyboardWillShow
  } = useKeyboardAwareness();

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
      <Animated.View style={[globalStyles.container, { left: animatedX, bottom }]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={globalStyles.container}>
            <Formik
              initialValues={{
                paymentAlias: ''
              }}
              onSubmit={onSubmit}
            >
              {(formikProps) => (
                <View style={globalStyles.container}>
                  <MyTextInput
                    handleKeyboardWillHide={handleKeyboardWillHide}
                    handleKeyboardWillShow={handleKeyboardWillShow}
                    style={styles.textInput}
                    placeholderTextColor="#D7D7D7"
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
                        text="Set Alias"
                        styles={{
                          text: globalStyles.buttonLabel,
                          container: [globalStyles.label, globalStyles.buttonLabelContainer]
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
        </TouchableWithoutFeedback>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#258FD9'
  },
  textInput: {
    padding: '2%',
    borderWidth: 4,
    borderColor: '#258FD9',
    borderRadius: 10
  }
})

export default BasicPaymentInfo;