import { StyleSheet } from 'react-native';

import { scaleSize } from '../../../../../../aux/dimensions';
import { globalBorderRadius } from '../../../../../../aux/globalStyles';
import { useTheme } from '../../../../../../theme/ThemeProvider';

const createStyles = () => {
  const { colors } = useTheme();
  const { createCard } = colors;
  return {
    styles: StyleSheet.create({
      container: {
        borderBottomRightRadius: globalBorderRadius,
        borderTopRightRadius: globalBorderRadius,
        height: scaleSize(10, true),
        width: scaleSize(90),
        backgroundColor: createCard.background,
      },
      cardIcon: {
        position: 'absolute',
        right: '85%',
      },
      subtitle: {
        color: createCard.foreground1,
      },
    }),
    colors,
  };
};

export default createStyles;
