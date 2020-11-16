import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { scaleSize } from '../../aux/dimensions';
import { AnimatedBackgroundView } from '../../aux/animations';
import { colorLuminance } from '../../aux/functions';
import * as cardActions from '../../redux/cards/actions';
import { useTheme } from '../../theme/ThemeProvider';

import MyCardBar from './components/MyCardBar';
import MyCardSummary from './components/MyCardSummary';
import MyAddPaymentButton from './components/MyAddPaymentButton';
import MyEditButton from './components/MyEditButton';
import MyDeleteButton from './components/MyDeleteButton';

const MyCard = ({
  cardName,
  color,
  closingDate,
  payments,
  selectCard = () => {},
  addPayment,
  cardLimit,
  setCardAction,
  id,
  dispatch,
}) => {
  const cardRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [isBeingPressed, setIsBeingPressed] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [modeSwitch, setModeSwitch] = useState(false);
  const { colors, isDark: isDarkMode } = useTheme();
  const cardColor = colors.cardColors[color];

  useEffect(() => {
    setModeSwitch(true);
  }, [isDarkMode]);

  const setCardData = () =>
    cardRef.current.measure((fx, fy, width, height, px, py) => {
      selectCard(width, height, px, py);
    });

  const centerCard = (option = 'animated') => {
    if (option === 'animated') scrollViewRef.current.scrollTo({ x: scaleSize(30), y: 0, animated: true });
    if (option === 'notAnimated') scrollViewRef.current.scrollTo({ x: scaleSize(30), y: 0, animated: false });
  };

  const expandCard = () => {
    setCardData();
    setCardAction('expand');
  };

  const deleteCard = () => {
    dispatch(cardActions.deleteCard(id));
  };

  const getPosition = () =>
    cardRef.current.measure((fx, fy, width, height, px, py) => {
      setCardPosition({ x: px, y: py });
    });

  const styles = StyleSheet.create({
    wrapper: {
      marginLeft: scaleSize(5),
      marginRight: scaleSize(5),
      marginTop: scaleSize(1, true),
      marginBottom: scaleSize(1, true),
    },
    content: {
      borderRadius: 10,
    },
    container: {
      padding: '2%',
      width: scaleSize(90),
      height: scaleSize(22, true),
    },
  });

  return (
    <>
      <MyDeleteButton
        isVisible={pressed}
        onPress={deleteCard}
        onDismiss={() => setPressed(false)}
        position={cardPosition}
      />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollViewRef}
          disableIntervalMomentum
          contentContainerStyle={styles.content}
          style={styles.content}
          snapToInterval={scaleSize(30)}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          horizontal
          directionalLockEnabled
          contentOffset={{
            x: scaleSize(30),
            y: 0,
          }}
        >
          {[
            <MyEditButton onPress={() => centerCard()} key={0} />,
            <Pressable
              onPress={() => {
                // centerCard();
                expandCard();
              }}
              key={1}
              onLongPress={() => {
                centerCard();
                setPressed(true);
                getPosition();
              }}
              delayLongPress={1000}
              onPressIn={() => setIsBeingPressed(true)}
              onPressOut={() => setIsBeingPressed(false)}
            >
              <AnimatedBackgroundView
                easing="cubic"
                setRef={cardRef}
                style={styles.container}
                actualColor={pressed || isBeingPressed ? colorLuminance(cardColor, -0.2) : cardColor}
                duration={modeSwitch ? 0 : 1000}
                onChange={modeSwitch ? () => setModeSwitch(false) : null}
              >
                <MyCardBar cardName={cardName} closingDate={closingDate} color={cardColor} />
                <MyCardSummary payments={payments} color={cardColor} />
              </AnimatedBackgroundView>
            </Pressable>,
            <MyAddPaymentButton
              key={2}
              onPress={() => {
                centerCard();
                addPayment();
              }}
            />,
          ]}
        </ScrollView>
      </View>
    </>
  );
};

export default connect()(MyCard);
