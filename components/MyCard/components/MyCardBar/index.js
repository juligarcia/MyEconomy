import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyLabel from '../../../MyLabel';
import { colorLuminance, getLuminance } from '../../../../aux/functions';
import { useTheme } from '../../../../theme/ThemeProvider';

const MyCardBar = ({ cardName, closingDate, color }) => {
  const format = date => (
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );
  
  const { isDark } = useTheme();

  const formatDate = date => {
    if(typeof date === 'object')  
      return format(date);
    return format(new Date(date));
  };
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: getLuminance(color, isDark),
      //backgroundColor: colorLuminance(color, isDark(color) ? 0.5 : -0.1),
      padding: '2%',
      borderRadius: 10
    },
    text: {
      color: 'white',
      fontWeight: '700'
    }
  });

  return (
    <View style={styles.container}>
      <MyLabel text={cardName || ''} styles={{ text: styles.text }} />
      <MyLabel text={closingDate ? `Closing date: ${formatDate(closingDate)}` : ''} styles={{ text: styles.text }} />
    </View>
  )
};


export default MyCardBar;