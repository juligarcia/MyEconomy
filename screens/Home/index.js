import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MyCards from '../../components/MyCards';
import NewCardModal from '../../components/NewCardModal';
import { connect } from 'react-redux';
import * as cardActions from '../../redux/cards/actions';

const Home = ({ dispatch }) => {

  const [openModal, setOpenModal] = useState(false)
  const [id, setId] = useState(0);

  const incId = () => {
    setId(id + 1);
  };

  const open = () => {
    setOpenModal(true);
    dispatch(cardActions.addingCard(true));
  };

  const close = () => {
    setOpenModal(false);
    dispatch(cardActions.addingCard(false));
  };

  return (
    <View style={styles.container}>
      <NewCardModal openModal={openModal} onClose={close} incId={incId} nextId={id} />
      <MyCards addCard={open} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center'
  }
})

export default connect()(Home);