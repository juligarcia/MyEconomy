import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import NewCardForm from '../NewCardForm';
import { scaleSize } from '../../aux/dimensions';

const NewCardModal = ({ openModal, onClose, incId, nextId, creatingPayment }) => (
  <Modal
    isVisible={openModal}
    backdropColor="black"
    backdropOpacity={0.1}
    onBackdropPress={onClose}
    swipeDirection={['down']}
    animationInTiming={500}
    animationOutTiming={500}
    backdropTransitionInTiming={500}
    backdropTransitionOutTiming={500}
    style={{ margin: 0, justifyContent: 'flex-end' }}
    onSwipeComplete={onClose}
    swipeThreshold={scaleSize(35, true)}
    propagateSwipe={creatingPayment}
  >
    <NewCardForm onClose={onClose} incId={incId} nextId={nextId} />
  </Modal>
);

const mapStateToProps = (store) => ({
  creatingPayment: store.cards.creatingPayment,
});

export default connect(mapStateToProps)(NewCardModal);
