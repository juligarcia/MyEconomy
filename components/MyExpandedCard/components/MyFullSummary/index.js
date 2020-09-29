import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import MyDummyCard from '../../../MyDummyCard';
import { colorLuminance, isDark } from '../../../../aux/functions';
import MyPayment from './components/MyPayment';
import { AntDesign } from '@expo/vector-icons'; 

class MyFullSummary extends PureComponent {

  render() {

    const backgroundColor = colorLuminance(this.props.card.color, isDark(this.props.card.color) ? 0.5 : -0.1);
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
        backgroundColor: backgroundColor,
        width: '100%',
        margin: '5%',
        borderRadius: 10,
        padding: 10,
        height: '80%'
      },
      header: {
        color: 'gray'
      }
    });

    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <MyDummyCard
              label="Payment list"
              Icon={Icon}
              labelStyle={styles.header}
            />
          }
          data={this.props.card.payments}
          keyExtractor={item => item.key.toString()}
          renderItem={renderPayments}
        />
      </View>
    );
  } 
};

export default MyFullSummary;
