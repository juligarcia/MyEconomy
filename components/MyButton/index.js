import React, { isValidElement } from 'react';
import { Button, View, TouchableHighlight } from 'react-native';
import MyLabel from '../MyLabel';

const MyButton = ({ styles, onPress, content, highlightColor }) => (
  <TouchableHighlight style={styles?.container} onPress={onPress} underlayColor={highlightColor || '#EF3939'}>
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
  </TouchableHighlight>
);

export default MyButton;