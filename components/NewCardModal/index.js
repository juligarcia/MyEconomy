import React from 'react';
import { View, Modal } from 'react-native';
import NewCardForm from '../NewCardForm';
import { globalStyles } from '../../aux/globalStyles';

const NewCardModal = ({ openModal, onClose, incId, nextId }) => {
  return (
    <Modal visible={openModal} animationType="slide" transparent>
      <View style={globalStyles.container}>
        <NewCardForm onClose={onClose} incId={incId} nextId={nextId} />
      </View>
    </Modal>
  );
};

export default NewCardModal;