import React, { useEffect } from 'react';
import Modal from "react-native-modal";
import NewPayment from '../NewPayment';
import { connect } from 'react-redux';
import { scaleSize } from '../../aux/dimensions';
import * as cardActions from '../../redux/cards/actions';

const NewPaymentModal = ({ openModal, addPayment, onClose, incId, nextId, dispatch }) => {
  useEffect(() => {
    dispatch(cardActions.creatingPayment(true));
    return (() => dispatch(cardActions.creatingPayment(false)));
  }, []);

  return (
    <Modal
      isVisible={openModal}
      backdropColor="black"
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      style={{ margin: 0, justifyContent: 'flex-end'}}
      onSwipeComplete={onClose}
      swipeThreshold={scaleSize(30, true)}
    >
      <NewPayment onClose={onClose} incId={incId} nextId={nextId} addPayment={addPayment} />
    </Modal>
)};

export default connect()(NewPaymentModal);