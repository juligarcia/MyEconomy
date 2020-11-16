import { StyleSheet } from 'react-native';

import { scaleSize } from '../../../../../../aux/dimensions';
import { useTheme } from '../../../../../../theme/ThemeProvider';

const createStyles = () => {
  const { colors } = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        height: scaleSize(10, true),
        width: scaleSize(90),
        backgroundColor: colors.foreground1,
      },
      help: {
        position: 'absolute',
        left: 0,
        top: 0,
      },
      textInput: {
        color: colors.textSecondary,
        width: scaleSize(50),
      },
      searchIcon: {
        position: 'absolute',
        right: '85%',
      },
      helpContent: {
        color: 'gray',
      },
    }),
    colors,
  };
};
export default createStyles;
