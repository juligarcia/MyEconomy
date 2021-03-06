import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MyDummyCard extends PureComponent {
  render(){
    const { label, labelStyle, containerStyle, Icon, before, both } = this.props;
    return(
      <View style={[styles.container, containerStyle]}>
        {(before || both) && Icon}
        <Text style={labelStyle}>{label}</Text>
        {(!before || both) && Icon}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default MyDummyCard;