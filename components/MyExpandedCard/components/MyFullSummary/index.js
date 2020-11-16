import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import MyDummyCard from '../../../MyDummyCard';
import { colorLuminance, getLuminance } from '../../../../aux/functions';
import { useTheme } from '../../../../theme/ThemeProvider';

import MyPayment from './components/MyPayment';

const MyFullSummary = ({ card }) => {
  const { color, payments } = card;
  const { colors, isDark } = useTheme();
  const cardColor = colors.cardColors[color];

  const backgroundColor = getLuminance(cardColor, isDark);
  const Icon = <AntDesign name="bars" size={15} color="gray" />;

  const renderPayments = ({ item, index, separators }) => {
    const { instalments, monthly, paymentAlias, paymentTotal } = item;
    return (
      <MyPayment
        instalments={instalments}
        monthly={monthly}
        paymentAlias={paymentAlias}
        paymentTotal={paymentTotal}
        color={backgroundColor}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      width: '100%',
      margin: '5%',
      borderRadius: 10,
      padding: 10,
      height: '80%',
    },
    header: {
      color: 'gray',
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MyDummyCard label="Payment list" Icon={Icon} labelStyle={styles.header} />}
        data={payments}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderPayments}
      />
    </View>
  );
};

export default MyFullSummary;
