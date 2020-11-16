import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import MyCards from '../../components/MyCards';
import NewCardModal from '../../components/NewCardModal';
import { connect } from 'react-redux';
import * as cardActions from '../../redux/cards/actions';
import { scaleSize } from '../../aux/dimensions';
import { globalStyles } from '../../aux/globalStyles';
import { useTheme } from '../../theme/ThemeProvider';


const Home = ({ dispatch, nextKey, card }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background
    }
  });

  const [openModal, setOpenModal] = useState(false)
  const [asyncData, setAsyncData] = useState({});

  const incKey = () => dispatch(cardActions.incKey());

  const open = () => {
    setOpenModal(true);
    dispatch(cardActions.addingCard(true));
  };

  const close = () => {
    setOpenModal(false);
    dispatch(cardActions.addingCard(false));
  };

  const loadData = async () => {
    try {
      dispatch(cardActions.loadCardsLoading());
      const jsonValue = await AsyncStorage.getItem('cardData');
      // ON ERROR DISPATCH IT
      if(jsonValue)
        setAsyncData(JSON.parse(jsonValue)); 
    } catch (error) {
      // ON ERROR DISPATCH IT
    }
    dispatch(cardActions.loadCardsLoaded());
  }

  const storeData = async data => {
    try {
      dispatch(cardActions.storeCardsLoading());
      await AsyncStorage.setItem('cardData', JSON.stringify(data));
    } catch (error) {
      // ON ERROR DISPATCH IT
    }
    dispatch(cardActions.storeCardsFinished());
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(card !== {}){
      storeData(card);
    }
  }, [card.myCards]);

  useEffect(() => {
    if(asyncData !== {})
      dispatch(cardActions.loadCards(asyncData));
  }, [asyncData]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <NewCardModal openModal={openModal} onClose={close} incId={incKey} nextId={nextKey} />
      <MyCards addCard={open} />
    </View>
  );
};

const mapStateToProps = store => ({
  nextKey: store.cards.nextKey,
  card: store.cards
});

export default connect(mapStateToProps)(Home);