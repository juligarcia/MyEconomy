import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import NewCardForm from '../NewCardForm';

const NewCardModal = ({ openModal, onClose, incId, nextId }) => {
  return (
    <Modal style={styles.modal} visible={openModal} animationType="slide" transparent>
      <View style={styles.modalView}>
        <View style={styles.modalContainer}>
          <NewCardForm onClose={onClose} incId={incId} nextId={nextId} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },  
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '95%',
    backgroundColor: '#0096ff',
    borderRadius: 10
  }
});

export default NewCardModal;