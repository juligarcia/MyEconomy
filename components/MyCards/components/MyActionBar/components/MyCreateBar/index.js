import React from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { scaleSize, subtitleFontLarge, titleFont } from '../../../../../../aux/dimensions';
import { globalStyles } from '../../../../../../aux/globalStyles';
import MyLabel from '../../../../../MyLabel';

const MyCreateBar = ({ create }) => (
  <TouchableWithoutFeedback onPress={create}>
    <View style={[globalStyles.centered, styles.container]}>
      <FontAwesome style={styles.cardIcon} name="credit-card-alt" size={titleFont} color="#239023" />
      <MyLabel
        text="Create card!"
        styles={{
          text: [globalStyles.subtitle, styles.subtitle]
        }}
      />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: scaleSize(8, true),
    width: scaleSize(90),
    backgroundColor: '#84E184',
    flexDirection: 'row'
  },
  cardIcon: {
    position: 'absolute',
    right: '85%'
  },
  subtitle: {
    color: '#239023'
  }
});

export default MyCreateBar;
