import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';
import MyLabel from '../../../MyLabel';
import MyTextInput from '../../../MyTextInput';
import MyButton from '../../../MyButton';
import { scaleSize, screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { useKeyboardAwareness } from '../../../../aux/hooks';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons';

const TotalAndInstalments = ({ addPaymentData, nextStep }) => {
  const { 
    bottom,
    handleKeyboardWillHide, 
    handleKeyboardWillShow
  } = useKeyboardAwareness();
  const [instalments, setInstalments] = useState('1');
  const [monthly, setMonthly] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [remainingInstalments, setRemainingInstalments] = useState('1');

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  const toggleMonthly = () => {
    setInstalments('1');
    setMonthly(!monthly);
    if(!monthly)
      setOnCourse(false);
  };

  const toggleOnCourse = () => {
    setOnCourse(!onCourse)
    if(!onCourse)
      setMonthly(false);
  };

  const maxInstalment = 36;

  const onSubmit = values => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      addPaymentData({...values, monthly, instalments, remainingInstalments});
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

  const renderPickerOptions = size => (
    new Array(size).fill(0).map((item, index) => <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />)
  );

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={[globalStyles.container, { left: animatedX, bottom }]}>
          <Formik
            initialValues={{
              paymentTotal: ''
            }}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
                <View style={[globalStyles.centered, { width: '100%' }]}>
                  <MyTextInput
                    handleKeyboardWillHide={handleKeyboardWillHide}
                    handleKeyboardWillShow={handleKeyboardWillShow}
                    placeholderTextColor="#D7D7D7"
                    style={[styles.textInput, globalStyles.noMargin]}
                    keyboardType='numeric'
                    placeholder="Total payment amount"
                    onChangeText={formikProps.handleChange('paymentTotal')}
                    value={formikProps.values.paymentTotal}
                  />
                  <MyLabel
                    text="Already payed some instalments?"
                    styles={{
                      container: [globalStyles.titleContainer, styles.switch],
                      text: [globalStyles.smallSubtitle, styles.monthlyLabel]
                    }}
                    Icon={
                      <Switch
                        ios_backgroundColor='#D7D7D7'
                        onValueChange={toggleOnCourse}
                        value={onCourse}
                      />
                    }
                  />
                  {onCourse ? (
                    <View style={{ width: '100%',  alignItems: 'center'}}>
                      <MyLabel
                        text="Set Total and Remaining instalments"
                        styles={{
                          container: [globalStyles.titleContainer, globalStyles.noMargin],
                          text: globalStyles.smallSubtitle
                        }}
                      />
                      <View style={styles.twoPickers}>
                        <Picker
                          style={styles.smallLeftPicker}
                          selectedValue={instalments}
                          onValueChange={selected => setInstalments(selected)}
                          itemStyle={styles.pickerItem}
                        >
                          {renderPickerOptions(maxInstalment)}
                        </Picker>
                        <Picker
                          style={styles.smallRightPicker}
                          selectedValue={remainingInstalments}
                          onValueChange={selected => setRemainingInstalments(selected)}
                          itemStyle={styles.pickerItem}
                        >
                          {renderPickerOptions(parseInt(instalments))}
                        </Picker>
                      </View>
                    </View>
                  ) : (
                    <View style={{ width: '100%',  alignItems: 'center'}}>
                      <MyLabel
                        text="How many instalments?"
                        styles={{
                          container: [globalStyles.titleContainer, globalStyles.noMargin],
                          text: globalStyles.smallSubtitle
                        }}
                      />
                      <Picker
                        style={styles.picker}
                        selectedValue={instalments}
                        onValueChange={selected => {
                          setInstalments(selected);
                          setRemainingInstalments(selected);
                        }}
                        itemStyle={styles.pickerItem}
                      >
                        {!monthly ? (
                          renderPickerOptions(maxInstalment)
                        ) : (
                          <Picker.Item key={1} label='1' value='1' />
                        )}
                      </Picker>
                    </View>
                  )}
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
                            style={{ marginLeft: 10 }}
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
            )}
          </Formik>
        </Animated.View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  twoPickers: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: '5%'
  },  
  picker: {
    marginTop: '5%',
    width: '60%',
    backgroundColor: '#258FD9',
    borderRadius: 10,
    padding: '5%'
  },
  smallLeftPicker: {
    width: '30%',
    backgroundColor: '#258FD9',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: '5%'
  },
  smallRightPicker: {
    width: '30%',
    backgroundColor: '#258FD9',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: '5%'
  },
  pickerItem: {
    color: 'white',
    height: scaleSize(17, true)
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