import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Animated } from 'react-native';
import MyDummyCard from '../../../MyDummyCard';
import { AntDesign } from '@expo/vector-icons'; 
import MyButton from '../../../MyButton';
import MyModal from '../../../MyModal';
import MyLabel from '../../../MyLabel';
import NewPayment from '../../../NewPayment';
import { colorLuminance, isDark } from '../../../../aux/functions';
import { screenWidth, subtitleFontLarge, titleFontLarge } from '../../../../aux/dimensions';
import { FontAwesome5 } from '@expo/vector-icons';
import { globalStyles } from '../../../../aux/globalStyles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Octicons } from '@expo/vector-icons';

const InitialPayments = ({ card, addCardData, nextStep }) => {

  const [payments, updatePayments] = useState([]);
  const [paymentId, updateId] = useState(0);
  const [openAddPayment, setOpen] = useState(false);

  const addPayment = payment => {
    updatePayments(prevState => [...prevState, payment]);
  };

  const animatedX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, []);

  const onSubmit = payments => () => {
    Animated.timing(animatedX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      addCardData(payments);
      addCardData({ nextPaymentId: paymentId });
      nextStep();
    });
  };

  const renderPayment = ({ item }) => {
    const { paymentAlias, paymentTotal, instalments, monthly } = item;
    return(
      <MyDummyCard
        label={
          `${paymentAlias}: $${paymentTotal} ${instalments > 1 ? (
            `in ${instalments} instalments`
          ) : (
            ''
          ) || monthly ? ', Monthly' : ''}`}
        labelStyle={[globalStyles.subtitle, styles.dummy]}
      />
    );
  };

  const colorVariant1 = card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1);
  const colorVariant2 = colorVariant1 && colorLuminance(colorVariant1, isDark(colorVariant1) ? 0.5 : -0.3);


  const styles = StyleSheet.create({
    container: {
      paddingTop: getStatusBarHeight()
    },
    icon: {
      padding: '3.5%'
    },
    list: {
      width: '90%',
      padding: '2%',
      borderRadius: 10,
      backgroundColor: colorVariant1
    },
    dummy: {
      color: 'gray' 
    },
    addPaymentContainer: {
      backgroundColor: '#0E78C2'
    },
    listItem: {
      height: '30%'
    },
    button: {
      marginBottom: '20%',
      backgroundColor: colorVariant1
    }
  });

  return (
    <Animated.View style={[globalStyles.container, styles.container, { left: animatedX }]}>
      <FontAwesome5 name="money-check" size={titleFontLarge} color="white" style={styles.icon} />
      <MyModal
        openModal={openAddPayment}
        content={
          <NewPayment
            addPayment={addPayment}
            onClose={() => setOpen(false)}
            nextId={paymentId}
            incId={() => updateId(prevState => prevState + 1)}
          />
        }
        containerStyle={[globalStyles.container, styles.addPaymentContainer]}
        position="flex-start"
      />
      <FlatList
        style={styles.list}
        keyExtractor={item => item.key.toString()}
        ListHeaderComponent={
          <MyDummyCard
            label="Initial Payments"
            labelStyle={[globalStyles.subtitle, styles.dummy]}
            Icon={
              <MyButton
                content={
                  <AntDesign name="plussquare" size={subtitleFontLarge} color="gray" />
                }
                onPress={() => setOpen(true)}
                highlightColor={
                  card.color && colorLuminance(card.color, isDark(card.color) ? 0.5 : -0.1)
                }
              />
            }
          />
        }
        data={payments}
        renderItem={renderPayment}
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
            text="Create Card"
            styles={{
              text: globalStyles.buttonLabel,
              container: [globalStyles.label, globalStyles.buttonLabelContainer]
            }}
          />
        }
        onPress={onSubmit({ payments })}
        styles={{
          container: [globalStyles.button, styles.button],
          text: globalStyles.buttonLabel
        }}
        highlightColor={
          colorVariant2 
        }
      />
    </Animated.View>
  );
};

export default InitialPayments;
