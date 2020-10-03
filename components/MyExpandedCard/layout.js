import React, { PureComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MyCardBar from '../MyCard/components/MyCardBar';
import MyButton from '../MyButton';
import MyFullSummary from './components/MyFullSummary';
import { scaleSize } from '../../aux/dimensions';
import { Slide } from '../../aux/animations';

const MyExpandedCard = ({ card, unExpand }) => {
  const { cardName, closingDate, color, payments } = card;
  const [dismount, setDismount] = useState(false);
  return (
    <View style={styles.container}>
      <MyCardBar
        cardName={cardName}
        closingDate={closingDate}
        color={color}
      />
      <Slide
        duration={300}
        onDismountCallback={unExpand}
        dismount={dismount}
      >
        <MyFullSummary card={card} />
      </Slide>
      <MyButton
        content="Close"
        onPress={() => {
          setDismount(true);
        }}
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
