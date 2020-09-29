import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { colorLuminance, isDark } from '../../../../aux/functions';
import { scaleSize, screenWidth, titleFontLarge } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';

import MyButton from '../../../MyButton';

const Submit = ({ nextStep, card }) => {

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, []);

  const onSubmit = () => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      nextStep();
    });
  }

  return (
    <Animated.View style={[globalStyles.container, { left: animatedX }]}>
      <MyButton
        content={'Create!'}
        onPress={onSubmit}
        highlightColor={
          colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1)
        }
        styles={{
          container: [globalStyles.button, styles.button],
          text: [globalStyles.buttonLabel, styles.buttonLabel]
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    aspectRatio: 2/1
  },
  buttonLabel: {
    fontSize: titleFontLarge
  }
});

export default Submit;

