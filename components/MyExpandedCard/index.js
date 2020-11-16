import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { scaleSize, screenHeight, screenWidth } from '../../aux/dimensions';
import { useTheme } from '../../theme/ThemeProvider';

import MyLoadingComponent from './components/MyLoadingComponent';
import MyExpandedCard from './layout';

const MyExpandedCardContainer = ({ cardData, unExpand, card }) => {
  const animH = useRef(new Animated.Value(cardData.height)).current;
  const animW = useRef(new Animated.Value(cardData.width)).current;
  const animPaddingTop = useRef(new Animated.Value(scaleSize(2))).current;
  const animateXY = useRef(
    new Animated.ValueXY({
      x: cardData.xOff,
      y: cardData.yOff,
    })
  ).current;
  const [loadingAnimation, setLoadingAnimation] = useState(true);
  const [isMounting, setIsMounting] = useState(true);
  const { colors } = useTheme();

  const animateUnExpand = () => {
    setLoadingAnimation(true);
    const { height, width, xOff, yOff } = cardData;
    Animated.parallel([
      Animated.timing(animW, {
        toValue: width,
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animH, {
        toValue: height,
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animateXY, {
        toValue: {
          x: xOff,
          y: yOff,
        },
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animPaddingTop, {
        toValue: scaleSize(2),
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
    ]).start(unExpand);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animW, {
        toValue: screenWidth,
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animH, {
        toValue: screenHeight,
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animateXY, {
        toValue: { x: 0, y: 0 },
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(animPaddingTop, {
        toValue: getStatusBarHeight() + scaleSize(3, true),
        duration: 700,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setLoadingAnimation(false);
      setIsMounting(false);
    });
  }, []);
  return (
    <Animated.View
      style={{
        width: animW,
        height: animH,
        top: animateXY.y,
        left: animateXY.x,
        backgroundColor: colors.cardColors[card.color],
        position: 'absolute',
        borderRadius: loadingAnimation ? 10 : 0,
        zIndex: 1,
        padding: scaleSize(2),
        paddingTop: animPaddingTop,
      }}
    >
      {loadingAnimation ? (
        <MyLoadingComponent isMounting={isMounting} card={card} />
      ) : (
        <MyExpandedCard card={card} unExpand={animateUnExpand} />
      )}
    </Animated.View>
  );
};

export default MyExpandedCardContainer;
