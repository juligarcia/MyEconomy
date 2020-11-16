import { StyleSheet } from 'react-native';

import { scaleSize } from '../../../../../../aux/dimensions';
import { globalBorderRadius } from '../../../../../../aux/globalStyles';
import { useTheme } from '../../../../../../theme/ThemeProvider';

const createStyles = () => {
  const { colors } = useTheme();
  const { config } = colors;
  return {
    styles: StyleSheet.create({
      container: {
        borderBottomLeftRadius: globalBorderRadius,
        borderTopLeftRadius: globalBorderRadius,
        height: scaleSize(10, true),
        width: scaleSize(90),
        backgroundColor: config.background,
        flexDirection: 'row',
      },
      actionsIcon: {
        position: 'absolute',
        right: '85%',
      },
      modeIcon: {
        marginLeft: '10%',
      },
      switch: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: config.foreground1,
        padding: '2%',
        borderRadius: 100
      },
    }),
    colors,
  };
};

export default createStyles;
