import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import MyLabel from '../../../../../MyLabel';
import MyPaymentBar from './components/MyPaymentBar';

const MyPayment = ({ instalments, monthly, paymentAlias, paymentTotal, color }) => {

  return (
    <View>
      <MyPaymentBar
        paymentAlias={paymentAlias}
        color={color}
      />
    </View>
  );
};

export default MyPayment;
