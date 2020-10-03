import React from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  Switch
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { scaleSize, subtitleFontLarge, titleFontLarge } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import { Ionicons } from '@expo/vector-icons'; 

const MyQuickActionsBar = ({ toggleMode, mode='dark'}) => {
  const iconName = mode === 'dark' ? 'ios-moon' : 'ios-sunny';
  const iconColor = mode === 'dark' ? '#2E2EB8' : '#FFD11A';
  return (
    <View style={[globalStyles.centered, styles.container]}>
      <MaterialIcons style={styles.actionsIcon} name="settings" size={titleFontLarge} color="#336499" />
      <View style={styles.switch}>
        <Switch
          ios_backgroundColor='#9FBEDF'
          onValueChange={toggleMode}
          value={mode}
        />
        <Ionicons style={styles.modeIcon} name={iconName} size={titleFontLarge} color={iconColor} />
      </View>
    </View>
)};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: scaleSize(8, true),
    width: scaleSize(90),
    backgroundColor: '#9FBEDF',
    flexDirection: 'row'
  },
  actionsIcon: {
    position: 'absolute',
    right: '85%'
  },
  modeIcon: {
    marginLeft: '10%'
  },
  switch: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#336499',
    padding: '2%',
    borderRadius: 100
  }
});

export default MyQuickActionsBar;