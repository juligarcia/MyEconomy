import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyLabel from '../../../../../../../MyLabel';
import { colorLuminance, isDark } from '../../../../../../../../aux/functions';

const MyPaymentBar = ({ paymentAlias, color }) => {

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colorLuminance(color, isDark(color) ? 0.5 : -0.1),
      padding: '2%',
      borderRadius: 10
    },
    text: {
      color: "white",
      fontWeight: '700'
    }
  });

  return (
    <View style={styles.container}>
      <MyLabel text={paymentAlias} styles={{ text: styles.text }} />
      {/*<MyLabel text={`Date: ${formatDate(closingDate)}`} styles={{ text: styles.text }} />*/}
    </View>
  )
};


export default MyPaymentBar;