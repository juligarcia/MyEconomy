import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { scaleSize, titleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const MySearchBar = ({  }) => {
  return (
    <View style={[globalStyles.centered, styles.container]}>
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
    borderRadius: 10,
    height: scaleSize(8, true),
    width: scaleSize(90),
    backgroundColor: '#D7D7D7',
    flexDirection: 'row'
  },
  textInput: {
    color: 'gray'
  },
  searchIcon: {
    position: 'absolute',
    right: '85%'
  },
  sortIcon: {
    position: 'absolute',
    left: '85%'
  }
});

export default MySearchBar;