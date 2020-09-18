import React, { isValidElement } from 'react';
import { Button, View, TouchableHighlight } from 'react-native';
import MyLabel from '../MyLabel';

const MyButton = ({ styles, onPress, content }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles?.container}>
      {isValidElement(content) ? (
        content
      ) : (
        <MyLabel
          styles={{
            text: styles?.text,
            container: styles?.content,
          }}
          text={content} />
      )}
    </View>
  </TouchableHighlight>
);

export default MyButton;