import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyLabel from '../../../MyLabel';
import { scaleSize } from '../../../../aux/dimensions';
import { formatter, getLuminance } from '../../../../aux/functions';
import { getTotal } from './utils';
import { useTheme } from '../../../../theme/ThemeProvider';

const MyCardSummary = ({ payments, color }) => {
  const { isDark } = useTheme();

  const lastPayment = payments && payments[payments.length - 1];

  const lastPaymentTotal = formatter.format(parseInt(lastPayment?.paymentTotal));

  const styles = StyleSheet.create({
    container: {
      marginTop: '2%',
      padding: '2%',
      backgroundColor: getLuminance(color, isDark),
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
          `Card total: ${formatter.format(payments ? getTotal(payments) : 0)}`
        }
        styles={labelStyles}
      />
    </View>
  )
};

export default MyCardSummary;