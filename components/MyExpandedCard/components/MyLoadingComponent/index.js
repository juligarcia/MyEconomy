import React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import MyCardBar from '../../../MyCard/components/MyCardBar';
import MyCardSummary from '../../../MyCard/components/MyCardSummary';
import { Slide } from '../../../../aux/animations';

const MyLoadingComponent = ({ card, isMounting }) => {
  return (
    <View>
      <MyCardBar
        cardName={card.cardName}
        closingDate={card.closingDate}
        color={card.color}
      />
      <Slide
        duration={300}
        dismount
        onlyDismount={isMounting}
        onlyMount={!isMounting}
      >
        <View>
          <MyCardSummary
            payments={card.payments}
            color={card.color}
          />
        </View>
      </Slide>
    </View>
)};

export default MyLoadingComponent;