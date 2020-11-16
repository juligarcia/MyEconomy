import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import MyDummyCard from '../../../MyDummyCard';
import { scaleSize } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';

const MyAddPaymentButton = ({ onPress }) => (
  <Pressable onPress={onPress}>
    <MyDummyCard
      containerStyle={[styles.container, globalStyles.centered]}
      Icon={
        <FontAwesome name="plus" size={scaleSize(6)} color="white" />
      }
    />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E78C2',
    width: scaleSize(30),
    height: scaleSize(22, true),
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default MyAddPaymentButton;