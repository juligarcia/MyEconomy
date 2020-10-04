import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import { scaleSize } from '../../aux/dimensions';

const MyModal = ({
  openModal,
  containerStyle,
  content,
  withArrow = false,
  arrowPlacement,
  arrowDisplacement = { x:0, y:0 },
  backgroundStyle,
  onClose,
  withClickAway = false
}) => {

  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 50
    },
    arrow: {
      position: 'absolute',
      top: arrowDisplacement.y,
      left: arrowDisplacement.x,
      zIndex: 1
    },
    modalBackground: {
      flex: 1
    }
  });

  return (
    <Modal
      style={styles.modal}
      visible={openModal}
      animationType="slide"
      transparent
    >
      <TouchableWithoutFeedback onPress={onClose} disabled={!withClickAway}>
        <View style={[styles.modalBackground, backgroundStyle]}>
          {withArrow && (
            <Octicons
              style={styles.arrow}
              name={'triangle' + (arrowPlacement === 'top' ? '-up' : '-down')}
              size={scaleSize(3)}
              color="#e6e6e6"
            />
          )}
          <TouchableWithoutFeedback>
            <View style={[styles.content, containerStyle]}>
              {content}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MyModal;