import React, { PureComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MyCardBar from '../MyCard/components/MyCardBar';
import MyButton from '../MyButton';
import { scaleSize } from '../../aux/dimensions';
import { Slide } from '../../aux/animations';
import { useTheme } from '../../theme/ThemeProvider';

import MyFullSummary from './components/MyFullSummary';

const MyExpandedCard = ({ card, unExpand }) => {
  const { cardName, closingDate, payments } = card;
  const [dismount, setDismount] = useState(false);
  const { colors } = useTheme();
  const cardColor = colors.cardColors[card.color];

  return (
    <View style={styles.container}>
      <MyCardBar cardName={cardName} closingDate={closingDate} color={cardColor} />
      <Slide duration={400} onDismountCallback={unExpand} dismount={dismount} easing="cubic">
        <MyFullSummary card={card} />
      </Slide>
      <MyButton
        content="Close"
        onPress={() => {
          setDismount(true);
        }}
        styles={{
          text: styles.buttonText,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: scaleSize(5),
    fontWeight: '600',
  },
  buttonContainer: {},
});

export default MyExpandedCard;
