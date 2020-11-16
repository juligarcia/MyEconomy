import React, { isValidElement } from 'react';
import { Button, View, Pressable } from 'react-native';
import MyLabel from '../MyLabel';

const MyButton = ({ styles = {}, onPress, content, highlightColor = '#D7D7D7', highlight = true, color }) => (
  highlight ? (
    <View style={styles.container}>
      <Pressable style={{ borderRadius: 10 }} onPress={onPress} underlayColor={highlightColor || '#EF3939'}>
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
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <Button title={content} color={color} onPress={onPress} />
    </View>
));

export default MyButton;