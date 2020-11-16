import React, { useRef, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { screenWidth } from './dimensions';
import { hex2rgb } from './functions';

export const Slide = ({
  onMountCallback,
  onDismountCallback,
  duration = 300,
  children,
  dismount = false,
  onlyDismount = false,
  onlyMount = false,
  easing = 'linear',
  style,
}) => {
  const animatedX = useRef(new Animated.Value(onlyDismount ? 0 : screenWidth)).current;
  const onMountAnimation = !onlyDismount
    ? () => {
        Animated.timing(animatedX, {
          toValue: 0,
          duration,
          easing: Easing[easing],
          useNativeDriver: false,
        }).start(onMountCallback);
      }
    : () => {};
  const onDismountAnimation = !onlyMount
    ? () => {
        Animated.timing(animatedX, {
          toValue: -screenWidth,
          duration,
          easing: Easing[easing],
          useNativeDriver: false,
        }).start(onDismountCallback);
      }
    : () => {};

  useEffect(onMountAnimation, []);
  useEffect(() => {
    if (dismount) onDismountAnimation();
  }, [dismount]);

  return <Animated.View style={[{ left: animatedX }, style]}>{children}</Animated.View>;
};

export const AnimatedBackgroundView = ({
  easing = 'linear',
  setRef,
  actualColor,
  duration = 500,
  children,
  onChange,
  style,
  initialColor = '#D7D7D7'
}) => {
  const [colorValues, setColorValues] = useState(
    actualColor ? [actualColor, actualColor] : [initialColor, initialColor]
  );
  const animatedColor = useRef(new Animated.Value(0)).current;

  const updateColors = () =>
    setColorValues((prevColors) => {
      const newColors = [...prevColors];
      newColors.shift();
      newColors.push(actualColor);
      return newColors;
    });

  useEffect(() => {
    if (actualColor) updateColors();
  }, [actualColor]);

  useEffect(() => {
    animatedColor.setValue(0);
    Animated.timing(animatedColor, {
      toValue: 1,
      duration,
      easing: Easing[easing],
      useNativeDriver: false,
    }).start(onChange);
  }, [colorValues]);

  return (
    <Animated.View
      ref={setRef}
      style={[
        {
          backgroundColor: animatedColor.interpolate({
            inputRange: [0, 1],
            outputRange: [hex2rgb(colorValues[0]), hex2rgb(colorValues[1])],
          }),
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
