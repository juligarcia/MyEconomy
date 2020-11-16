import { StyleSheet } from 'react-native';

import { useTheme } from '../../../../../../theme/ThemeProvider';
import { scaleSize } from '../../../../../../aux/dimensions';

const createStyles = () => {
  const { colors } = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        marginBottom: '1%',
        marginTop: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
      optionR: {
        marginRight: '5%',
      },
      optionL: {
        marginLeft: '5%',
      },
      label: {
        color: colors.textSecondary,
        fontSize: scaleSize(3),
      },
    }),
    colors,
  };
};

export default createStyles;
