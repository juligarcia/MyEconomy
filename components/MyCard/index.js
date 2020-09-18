import React from 'react';
import { StyleSheet, useWindowDimensions, View, ScrollView, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import MyCardBar from './components/MyCardBar';
import MyCardSummary from './components/MyCardSummary';
import MyDummyCard from '../MyDummyCard';

const MyCard = ({ cardName, color, closingDate }) => {

  const width = useWindowDimensions().width;

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 10,
      marginRight: width * 0.05,
      marginLeft: width * 0.05,
      backgroundColor: color,
      width: width * 0.9
    },
    smallContainer: {
      borderRadius: 10,
      width: width * 0.3,
      marginRight: width * 0,
      marginLeft: width * 0,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    delete: {
      backgroundColor: 'red'
    },
    add: {
      backgroundColor: 'gray'
    }
  });

  const DeleteIcon = <FontAwesome5 name="trash" size={25} color="white" />;
  const AddIcon = <AntDesign name="plussquare" size={25} color="white" />;

  return (
    <ScrollView
      snapToInterval={width * 0.3}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      horizontal
      directionalLockEnabled
      contentOffset={{
        x: width * 0.3,
        y: 0
      }}
    >
    {[
      <MyDummyCard key={0} containerStyle={[styles.smallContainer, styles.delete, styles.center]} Icon={DeleteIcon} />,
      <View key={1} style={styles.container}>
        <MyCardBar cardName={cardName} closingDate={closingDate} />
        <MyCardSummary cardInfo={'Tarjeta principal, se debe abonar $15434,64'} />
      </View>,
      <MyDummyCard key={2} containerStyle={[styles.smallContainer, styles.add, styles.center]} Icon={AddIcon} before/>
    ]}
    </ScrollView>
  )
};

export default MyCard;