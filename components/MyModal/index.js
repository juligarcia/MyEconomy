import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

const MyModal = ({ openModal, containerStyle, content, position = 'center' }) => {

  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 50
    },  
    modalView: {
      flex: 1,
      justifyContent: position,
      alignItems: 'center'
    }
  });

  return (
    <Modal style={styles.modal} visible={openModal} animationType="slide" transparent>
      <View style={styles.modalView}>
        <View style={[styles.modalContainer, containerStyle]}>
          {content}
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;