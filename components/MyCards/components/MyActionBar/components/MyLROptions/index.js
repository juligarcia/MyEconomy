import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scaleSize, smallSubtitleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import { FontAwesome } from '@expo/vector-icons';
import MyLabel from '../../../../../MyLabel';

const MyLROptions = ({ left, right, style, color }) => {

  const styles = StyleSheet.create({
    container: {
      marginBottom: '1%',
      marginTop: '1%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    optionR: {
      marginRight: '2%'
    },
    optionL: {
      marginLeft: '2%'
    },
    label: {
      color: 'gray',
      fontSize: smallSubtitleFont
    }
  });

  return (
    <View style={[styles.container, style]} >
      {left && <MyLabel
        styles={{
          container: globalStyles.label,
          text: [globalStyles.smallSubtitle, styles.label, styles.optionL]
        }}
        text={left}
        Icon={<FontAwesome name="caret-left" size={smallSubtitleFont} color={color || 'gray'} />}
        before
      />}
      <MyLabel
        styles={{
          container: globalStyles.label,
          text: [globalStyles.smallSubtitle, styles.label, styles.optionR]
        }}
        text="Swipe"
      />
      {right && <MyLabel
        styles={{
          container: globalStyles.label,
          text: [globalStyles.smallSubtitle, styles.label, styles.optionR]
        }}
        text={right}
        Icon={<FontAwesome name="caret-right" size={smallSubtitleFont} color={color || 'gray'} />}
      />}
    </View>
  );
};

export default MyLROptions;
