import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MyCardBar from '../MyCard/components/MyCardBar';
import MyButton from '../MyButton';
import MyFullSummary from './components/MyFullSummary';
import { scaleSize } from '../../aux/dimensions';

const MyExpandedCard = ({ card, unExpand }) => {
  const { cardName, closingDate, color, payments } = card;
  return (
    <View style={styles.container}>
      <MyCardBar
        cardName={cardName}
        closingDate={closingDate}
        color={color}
      />
      <MyFullSummary card={card} />
      <MyButton
        content="Close"
        onPress={unExpand}
        styles={{
          text: styles.buttonText
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    height: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: scaleSize(5),
    fontWeight: '600'
  },
  buttonContainer:{

  }

});

export default MyExpandedCard;
