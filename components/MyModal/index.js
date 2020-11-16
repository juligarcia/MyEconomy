import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';

import { scaleSize } from '../../aux/dimensions';

import Triangle from './components/Triangle';

const MyModal = ({
  setModalHeight,
  openModal,
  containerStyle,
  content,
  withArrow = false,
  arrowPlacement,
  arrowDisplacement = { x: 0, y: 0 },
  backgroundStyle,
  onClose,
  withClickAway = false,
  arrowHeight = scaleSize(1, true),
  arrowWidth = scaleSize(4),
  withBlur = false,
}) => {
  const upRight = arrowPlacement === 'top';

  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 50,
    },
    arrow: {
      position: 'absolute',
      top: arrowDisplacement.y + (upRight ? -arrowHeight : 0),
      left: arrowDisplacement.x - arrowWidth / 2,
      zIndex: 1,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

  return (
    <Modal style={styles.modal} visible={openModal} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose} disabled={!withClickAway}>
        <View style={[styles.modalBackground, backgroundStyle]}>
          <BlurView tint="dark" intensity={withBlur ? 1000 : 0} style={{ width: '100%', height: '100%' }}>
            {withArrow && (
              <Triangle
                width={arrowWidth}
                height={arrowHeight}
                style={[styles.arrow, !upRight && { transform: [{ rotate: '180deg' }] }]}
                color="#E6E6E6"
              />
            )}
            <TouchableWithoutFeedback>
              <View
                style={[styles.content, containerStyle]}
                onLayout={
                  setModalHeight &&
                  ((event) => {
                    const { height } = event.nativeEvent.layout;
                    setModalHeight(height);
                  })
                }
              >
                {content}
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MyModal;
