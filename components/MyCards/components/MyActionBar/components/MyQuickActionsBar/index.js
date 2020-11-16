import React from 'react';
import { View, Switch } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { scaleSize } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import { DARK_THEME, LIGHT_THEME } from '../../../../../../texts/constants';
import { useTheme } from '../../../../../../theme/ThemeProvider';

import createStyles from './styles';
import { SUN_ICON, MOON_ICON } from './constants';

const MyQuickActionsBar = () => {
  const { setScheme, isDark } = useTheme();
  const { colors, styles } = createStyles();
  const { config } = colors;

  const iconName = isDark ? MOON_ICON : SUN_ICON;
  const toggleMode = () => (isDark ? setScheme(LIGHT_THEME) : setScheme(DARK_THEME));

  return (
    <View style={[globalStyles.centered, styles.container]}>
      <MaterialIcons
        style={styles.actionsIcon}
        name="settings"
        size={scaleSize(7)}
        color={config.foreground1}
      />
      <View style={styles.switch}>
        <Switch
          trackColor={{
            true: colors.modeAccent,
          }}
          ios_backgroundColor={config.background}
          onValueChange={toggleMode}
          value={isDark}
        />
        <Ionicons style={styles.modeIcon} name={iconName} size={scaleSize(7)} color={colors.modeAccent} />
      </View>
    </View>
  );
};

export default MyQuickActionsBar;
