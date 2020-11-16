import React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import MyCardBar from '../../../MyCard/components/MyCardBar';
import MyCardSummary from '../../../MyCard/components/MyCardSummary';
import { Slide } from '../../../../aux/animations';
import { useTheme } from '../../../../theme/ThemeProvider';

const MyLoadingComponent = ({ card, isMounting }) => {
  const { colors } = useTheme();
  const cardColor = colors.cardColors[card.color];
  return (
    <View>
      <MyCardBar
        cardName={card.cardName}
        closingDate={card.closingDate}
        color={cardColor}
      />
      <Slide
        duration={700}
        dismount
        onlyDismount={isMounting}
        onlyMount={!isMounting}
        easing="cubic"
      >
        <MyCardSummary
          payments={card.payments}
          color={cardColor}
        />
      </Slide>
    </View>
)};

export default MyLoadingComponent;