import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';
import MyLabel from '../../../MyLabel';
import MyButton from '../../../MyButton';
import { screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons';

const TotalAndInstalments = ({ addPaymentData, nextStep }) => {

  const [instalments, setInstalments] = useState('1');
  const [monthly, setMonthly] = useState(false);

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  const toggleMonthly = () => {
    setInstalments('1');
    setMonthly(!monthly);
  };

  const maxInstalment = 36;

  const onSubmit = values => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      addPaymentData({...values, monthly, instalments});
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
        <MyLabel
          text="Payment Information"
          styles={{
            text: globalStyles.title,
            container: globalStyles.titleContainer
          }}
        />
        <Formik
          initialValues={{
            paymentTotal: ''
          }}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            <View style={[globalStyles.centered, { width: '100%' }]}>
              <TextInput
                placeholderTextColor="#D7D7D7"
                textAlign="center"
                selectionColor="white"
                style={[globalStyles.textInput, styles.textInput]}
                keyboardType='numeric'
                placeholder="Total payment amount"
                onChangeText={formikProps.handleChange('paymentTotal')}
                value={formikProps.values.paymentTotal}
              />
              <MyLabel
                text="How many instalments?"
                styles={{
                  container: globalStyles.titleContainer,
                  text: globalStyles.smallSubtitle
                }}
              />
              <Picker
                style={styles.picker}
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
              <MyLabel
                text="Monthly payment?"
                styles={{
                  container: [globalStyles.titleContainer, styles.switch],
                  text: [globalStyles.smallSubtitle, styles.monthlyLabel]
                }}
                Icon={
                  <Switch
                    ios_backgroundColor='#D7D7D7'
                    onValueChange={toggleMonthly}
                    value={monthly}
                  />
                }
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
                    text="Add"
                    styles={{
                      text: globalStyles.buttonLabel,
                      container: [globalStyles.label, globalStyles.buttonLabelContainer]
                    }}
                  />
                }
                onPress={
                  formikProps.values.paymentTotal ? (
                    formikProps.handleSubmit
                  ) : (
                    () => alert('You forgot to enter an amount!')
                  )
                }
                styles={{
                  text: globalStyles.buttonLabel,
                  container: [globalStyles.button, styles.button]
                }}
                highlightColor="#086CB2"
              />
            </View>
            </TouchableWithoutFeedback>
          )}
        </Formik>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '60%',
    backgroundColor: '#258FD9',
    borderRadius: 10,
    padding: '5%'
  },
  pickerItem: {
    color: 'white'
  },
  textInput: {
    borderWidth: 4,
    borderColor: '#258FD9',
    padding: '2%',
    borderRadius: 10
  },
  switch: {
    backgroundColor: '#258FD9',
    padding: '2%',
    borderRadius: 100
  },
  monthlyLabel: {
    marginRight: '5%'
  },
  button: {
    backgroundColor: '#258FD9'
  }
})

export default TotalAndInstalments;