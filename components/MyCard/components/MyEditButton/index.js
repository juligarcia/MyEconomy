import React from 'react';
import {
  StyleSheet,
  Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import MyDummyCard from '../../../MyDummyCard';
import { scaleSize } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';

const MyEditButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <MyDummyCard
        containerStyle={[styles.container, globalStyles.centered]}
        Icon={
          <MaterialIcons name="edit" size={scaleSize(8)} color="white" />
        }
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DD9937',
    width: scaleSize(30),
    height: scaleSize(22, true),
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});

export default MyEditButton;