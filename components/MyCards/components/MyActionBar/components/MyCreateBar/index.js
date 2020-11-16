import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { titleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import MyLabel from '../../../../../MyLabel';

import createStyles from './styles';

const MyCreateBar = ({ create }) => {
  const { styles, colors } = createStyles();
  const { createCard } = colors;
  return (
    <TouchableWithoutFeedback onPress={create}>
      <View style={[globalStyles.centered, styles.container]}>
        <FontAwesome
          style={styles.cardIcon}
          name="credit-card-alt"
          size={titleFont}
          color={createCard.foreground1}
        />
        <MyLabel
          text="Create card!"
          styles={{
            text: [globalStyles.subtitle, styles.subtitle],
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyCreateBar;
