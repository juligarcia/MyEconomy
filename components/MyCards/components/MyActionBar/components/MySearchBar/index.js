import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { scaleSize, titleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import MyHelp from '../../../../../MyHelp';
import MyLabel from '../../../../../MyLabel';

const MySearchBar = ({  }) => {
  const [anchor, setAnchor] = useState(null);
  return (
    <View ref={setAnchor} style={[globalStyles.centered, styles.container]}>
      <MyHelp
        buttonStyle={styles.help}
        content={
          <MyLabel
            text="Type the payment name you want to find, and we'll find it for you!"
            styles={{
              text: [globalStyles.smallSubtitle, styles.helpContent]
            }}
          />
        }
        anchor={anchor}
      />
      <FontAwesome5 style={styles.searchIcon} name="search" size={titleFont} color="gray" />
      <TextInput
        placeholderTextColor="gray"
        placeholder="Search for payment"
        textAlign="center"
        style={[globalStyles.textInput, styles.textInput]}
        selectionColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleSize(8, true),
    width: scaleSize(90),
    backgroundColor: '#D7D7D7',
    flexDirection: 'row'
  },
  help: {
    top: -scaleSize(7),
    right:scaleSize(22)
  },
  textInput: {
    color: 'gray',
    width: scaleSize(20, true)
  },
  searchIcon: {
    position: 'absolute',
    right: '85%'
  },
  sortIcon: {
    position: 'absolute',
    left: '85%'
  },
  helpContent: {
    color: 'gray'
  }
});

export default MySearchBar;