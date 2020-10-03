import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyLabel from '../../../MyLabel';
import { scaleSize } from '../../../../aux/dimensions';
import { colorLuminance, isDark, formatter } from '../../../../aux/functions';

const MyCardSummary = ({ payments, color }) => {

  const getTotal = (acc, payment) => acc + parseInt(payment.paymentTotal);
  const lastPayment = payments && payments[payments.length - 1];

  const lastPaymentTotal = formatter.format(parseInt(lastPayment?.paymentTotal));

  const styles = StyleSheet.create({
    container: {
      padding: '2%',
      marginTop: scaleSize(3),
      marginBottom: '10%',
      backgroundColor: colorLuminance(color, isDark(color) ? 0.5 : -0.1),
      borderRadius: 10,
      width: '100%'
    },
    text: {
      color: 'white',
      fontSize: 15,
      fontWeight: '600'
    }
  });

  const labelStyles = {
    container: styles.label,
    text: styles.text
  };

  return (
    <View style={styles.container}>
      <MyLabel
        text={
          `Last payment - ${lastPayment ? `${lastPayment.paymentAlias}: ${lastPaymentTotal}` : ''}`
        }
        styles={labelStyles}
      />
      <MyLabel
        text={
          `Card total: ${formatter.format(payments ? payments.reduce(getTotal, 0) : 0)}`
        }
        styles={labelStyles}
      />
    </View>
  )
};

export default MyCardSummary;