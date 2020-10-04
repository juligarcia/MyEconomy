import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import ColorPicker from './components/ColorPicker';
import MyButton from '../../../MyButton';
import MyLabel from '../../../MyLabel';
import { colorLuminance, isDark } from '../../../../aux/functions';
import { titleFont, subtitleFontLarge, scaleSize } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';
import { Slide } from '../../../../aux/animations';
import { Octicons } from '@expo/vector-icons';

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

  const [submit, setSubmit] = useState({ dismount: false });

  const setColor = color => {
    addCardData({ color });
  };

  const onSubmit = values => setSubmit({dismount: true, values});

  const onDismountCallback = () => {
    addCardData(submit.values);
    nextStep();
  }

  const colorVariant1 = card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1);
  const colorVariant2 = colorVariant1 && colorLuminance(colorVariant1, isDark(colorVariant1) ? 0.5 : -0.3);

  const styles = StyleSheet.create({
    container: {
      padding: '10%'
    },
    title: {
      marginRight: '5%'
    },
    formContainer: {
      alignItems: 'center'
    },
    button: {
      backgroundColor: colorVariant1
    },
    textInput: {
      borderColor: colorVariant1 || '#D7D7D7',
      borderWidth: 4,
      borderRadius: 10,
      padding: '2%'
    },
    colorPicker: {
      backgroundColor: colorVariant1,
      padding: '5%',
      borderRadius: 100
    }
  });

  return(
    <Slide
      onDismountCallback={onDismountCallback}
      dismount={submit.dismount}
    >
    <View style={[globalStyles.container, styles.container]}>
        <MyLabel
          text="My New Card"
          styles={{
            text: [globalStyles.title, styles.title],
            container: [globalStyles.titleContainer]
          }}
          Icon={
            <AntDesign
              color="white"
              name="form"
              size={titleFont}
            />
          }
        />
      <ColorPicker
        selectedColor={card.color}
        highlightColor={colorVariant2}
        colors={colors}
        setColor={setColor}
        containerStyle={styles.colorPicker}
      />
      <Formik
        initialValues={{
          cardName: ''
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <View style={styles.formContainer}>
            <TextInput
              placeholderTextColor="white"
              textAlign="center"
              style={[globalStyles.textInput, styles.textInput]}
              selectionColor="white"
              placeholder="New card name"
              onChangeText={formikProps.handleChange('cardName')}
              value={formikProps.values.cardName}
            />
            <MyButton
              onPress={
                !formikProps.values.cardName ? (
                  () => alert('No card name entered')
                ) : !card.color ? (
                  () => alert('No color selected')
                ) : (
                  formikProps.handleSubmit
                )
              }
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
                  text="Personalize"
                  styles={{
                    text: globalStyles.buttonLabel,
                    container: [globalStyles.label, globalStyles.buttonLabelContainer]
                  }}
                />
              }
              styles={{
                container: [globalStyles.button, styles.button]
              }}
              highlightColor={colorVariant2}
            />
          </View>
        )}
      </Formik>
    </View>
    </Slide>
  );
};

export default Personalization;

