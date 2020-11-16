import React, { useState } from 'react';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { scaleSize } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import MyHelp from '../../../../../MyHelp';
import MyLabel from '../../../../../MyLabel';
import MyTextInput from '../../../../../MyTextInput';
import { useTheme } from '../../../../../../theme/ThemeProvider';

import createStyles from './styles';

const MySearchBar = () => {
  const [anchor, setAnchor] = useState(null);
  const { styles, colors } = createStyles();

  return (
    <View ref={setAnchor} style={[globalStyles.centered, styles.container]}>
      <MyHelp
        buttonStyle={styles.help}
        content={(
          <MyLabel
            text="Type the payment name you want to find, and we'll find it for you!"
            styles={{
              text: [globalStyles.smallSubtitle, styles.helpContent],
            }}
          />
        )}
        anchor={anchor}
      />
      <FontAwesome5
        style={styles.searchIcon}
        name="search"
        size={scaleSize(6)}
        color={colors.textSecondary}
      />
      <MyTextInput
        placeholderTextColor={colors.textSecondary}
        placeholder="Search for payment"
        style={styles.textInput}
        selectionColor={colors.textSecondary}
      />
    </View>
  );
};

export default MySearchBar;
