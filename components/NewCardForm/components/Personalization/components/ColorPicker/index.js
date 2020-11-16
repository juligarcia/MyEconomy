import React from 'react';
import { StyleSheet, View } from 'react-native';
import CircularColorButton from './components/CircularColorButton';
import { useTheme } from '../../../../../../theme/ThemeProvider';

const ColorPicker = ({ setColor, selectedColor, containerStyle, highlightColor }) => {
  const { colors } = useTheme();

  const colorLabels = Object.keys(colors.cardColors);
  const colorValues = Object.values(colors.cardColors);

  const setPickedColor = colorLabel => () => {
    setColor(colorLabel);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {colorValues.map((colorValue, index) => (
        <CircularColorButton
          highlightColor={highlightColor}
          key={index}
          selected={selectedColor == colorValue}
          colorValue={colorValue}
          onPress={setPickedColor(colorLabels[index])}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
})

export default ColorPicker;