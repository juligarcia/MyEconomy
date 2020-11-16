import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { scaleSize } from '../../../../aux/dimensions';
import { globalStyles } from '../../../../aux/globalStyles';
import { Octicons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";

const MyDeleteButton = ({ onPress, onDismiss, isVisible, position }) => (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onDismiss}
      backdropOpacity={0}
      animationIn="shake"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      animationInTiming={500}
      animationOutTiming={500}
    >
        <Pressable
          onPress={onPress}
          style={[
            styles.container,
            globalStyles.centered, 
            {
              right: position.x - scaleSize(2.5),
              top: position.y - scaleSize(1.5, true)
            }
          ]}
        >
          <Octicons name="dash" size={scaleSize(6)} color="black" />
        </Pressable>
    </Modal>
  );

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: scaleSize(7),
    width: scaleSize(7),
    borderRadius: 1000,
    backgroundColor: 'gray'
  }
});

export default MyDeleteButton;