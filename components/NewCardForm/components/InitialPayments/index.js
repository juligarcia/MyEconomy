import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Animated } from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';

import MyButton from '../../../MyButton';
import MyLabel from '../../../MyLabel';
import { colorLuminance, isDark, getLuminance } from '../../../../aux/functions';
import { scaleSize, screenWidth, subtitleFontLarge } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';
import NewPaymentModal from '../../../NewPaymentModal';
import { useTheme } from '../../../../theme/ThemeProvider';

const InitialPayments = ({ card, addCardData, nextStep }) => {
  const [payments, updatePayments] = useState([]);
  const [paymentId, updateId] = useState(0);
  const [openAddPayment, setOpen] = useState(false);
  const { colors, isDark: isDarkMode } = useTheme();
  const cardColor = colors.cardColors[card.color];

  const addPayment = (payment) => {
    updatePayments((prevState) => [...prevState, payment]);
  };

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const onSubmit = (payments) => () => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      addCardData(payments);
      addCardData({ nextPaymentId: paymentId });
      nextStep();
    });
  };

  const renderPayment = ({ item }) => {
    const { paymentAlias, paymentTotal, instalments, monthly } = item;
    return (
      <MyLabel
        text={`${paymentAlias}: $${paymentTotal} ${
          instalments > 1 ? `in ${instalments} instalments` : '' || monthly ? ', Monthly' : ''
        }`}
        styles={{
          text: [globalStyles.subtitle, styles.paymentLabel],
          container: styles.listItem,
        }}
      />
    );
  };

  // const colorVariant1 = cardColor && colorLuminance(cardColor, isDark(cardColor) ? 0.5 : -0.1);
  // const colorVariant2 = colorVariant1 && colorLuminance(colorVariant1, isDark(colorVariant1) ? 0.5 : -0.3);

  const colorVariant1 = cardColor && getLuminance(cardColor, isDarkMode);
  const colorVariant2 = colorVariant1 && getLuminance(colorVariant1, isDarkMode);

  const styles = StyleSheet.create({
    container: {
      paddingTop: scaleSize(10, true),
    },
    icon: {
      padding: '3.5%',
    },
    list: {
      width: '90%',
      padding: '2%',
      borderRadius: 10,
      backgroundColor: colorVariant1,
    },
    paymentLabel: {
      color: 'gray',
    },
    listItem: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignContent: 'flex-start',
      backgroundColor: '#F2F2F2',
      borderRadius: 10,
      padding: '2%',
      marginBottom: '2%',
    },
    button: {
      marginBottom: '20%',
      backgroundColor: colorVariant1,
    },
  });

  return (
    <Animated.View style={[globalStyles.container, styles.container, { left: animatedX }]}>
      <NewPaymentModal
        openModal={openAddPayment}
        addPayment={addPayment}
        onClose={() => setOpen(false)}
        nextId={paymentId}
        incId={() => updateId((prevState) => prevState + 1)}
      />
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.key.toString()}
        ListHeaderComponent={(
          <MyButton
            content={(
              <MyLabel
                text="Initial Payments"
                styles={{
                  text: [globalStyles.subtitle, styles.paymentLabel],
                  container: styles.listItem,
                }}
                labelStyle={[globalStyles.subtitle, styles.paymentLabel]}
                Icon={<Entypo name="plus" size={subtitleFontLarge} color="gray" />}
              />
            )}
            onPress={() => setOpen(true)}
          />
        )}
        data={payments}
        renderItem={renderPayment}
      />
      <MyButton
        content={(
          <MyLabel
            Icon={(
              <Octicons
                name="chevron-right"
                size={subtitleFontLarge}
                color="white"
                style={{ marginLeft: '5%' }}
              />
            )}
            text="Create Card"
            styles={{
              text: globalStyles.buttonLabel,
              container: [globalStyles.label, globalStyles.buttonLabelContainer],
            }}
          />
        )}
        onPress={onSubmit({ payments })}
        styles={{
          container: [globalStyles.button, styles.button],
          text: globalStyles.buttonLabel,
        }}
        highlightColor={colorVariant2}
      />
    </Animated.View>
  );
};

export default InitialPayments;
