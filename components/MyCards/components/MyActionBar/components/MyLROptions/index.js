import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { smallSubtitleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import MyLabel from '../../../../../MyLabel';

import createStyles from './styles';

const MyLROptions = ({ left, right, style, color }) => {
  const swipeStyle = {
    marginLeft: right && !left ? '3%' : 0,
    marginRight: left && !right ? '3%' : 0,
  };

  const { styles, colors } = createStyles();

  return (
    <View style={[styles.container, style]}>
      {left && (
        <MyLabel
          styles={{
            container: globalStyles.label,
            text: [globalStyles.smallSubtitle, styles.label, styles.optionL],
          }}
          text={left}
          Icon={
            <FontAwesome name="caret-left" size={smallSubtitleFont} color={color || colors.textSecondary} />
          }
          before
        />
      )}
      <MyLabel
        styles={{
          container: [globalStyles.label, swipeStyle],
          text: [globalStyles.smallSubtitle, styles.label],
        }}
        text="Swipe"
      />
      {right && (
        <MyLabel
          styles={{
            container: globalStyles.label,
            text: [globalStyles.smallSubtitle, styles.label, styles.optionR],
          }}
          text={right}
          Icon={
            <FontAwesome name="caret-right" size={smallSubtitleFont} color={color || colors.textSecondary} />
          }
        />
      )}
    </View>
  );
};

export default MyLROptions;
