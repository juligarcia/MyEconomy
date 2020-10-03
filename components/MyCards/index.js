import React, { useState } from 'react';
import { StyleSheet, FlatList, useWindowDimensions, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons'; 
import MyDummyCard from '../MyDummyCard';
import MyCard from '../MyCard';
import MyExpandedCard from '../MyExpandedCard';
import MyActionBar from './components/MyActionBar';
import { scaleSize } from '../../aux/dimensions';
import { globalStyles } from '../../aux/globalStyles';
import MyModal from '../MyModal';
import NewPayment from '../NewPayment';
import * as cardActions from '../../redux/cards/actions';

const MyCards = ({ myCards, addCard, addingCard, dispatch }) => {

  const [selectedCard, setSelectedCard] = useState(null);
  const selectCard = key => (width, height, xOff, yOff) => setSelectedCard({key, width, height, xOff, yOff});
  const width = useWindowDimensions().width;

  const [newPayment, setNewPayment] = useState(-1);
  const openNewPayment = key => () => setNewPayment(key);
  const nextId = myCards.find(card => card.key === newPayment)?.nextPaymentId;

  const configureCard = ({ item, index, separators }) => {
    const { cardName, color, key, closingDate, payments } = item;
    return(
      <MyCard
        key={key}
        cardName={cardName}
        color={color}
        payments={payments}
        closingDate={closingDate}
        selectCard={selectCard(key)}
        addPayment={openNewPayment(key)}
      />
    )
  };

  const unExpand = () => setSelectedCard(null);

  return (
    <View style={styles.container}>
      {selectedCard && (
        <MyExpandedCard
          card={myCards.find(card => card.key == selectedCard.key)}
          cardData={selectedCard}
          unExpand={unExpand}
        />
      )}
      <MyModal
        openModal={newPayment > -1}
        content={
          <NewPayment
            onClose={() => setNewPayment(-1)}
            addPayment={payment => dispatch(cardActions.addPayment(payment, newPayment))}
            nextId={nextId}
            incId={() => dispatch(cardActions.updateNextPaymentId(nextId + 1, newPayment))}
          />
        }
        containerStyle={[globalStyles.container, styles.addPaymentContainer]}
        position="flex-start"
      />
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <MyActionBar create={addCard} />
        }
        ListHeaderComponentStyle={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}
        data={myCards}
        renderItem={configureCard}
        keyExtractor={item => item.key.toString()}
        contentOffset={{ x: width, y: 0 }}
      />
    </View>
)};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  list:{
    width: '100%',
    height: '100%'
  },
  addLabel: {
    color: '#A6A6A6',
  },
  addConatiner: {
    height: scaleSize(12),
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  addPaymentContainer: {
    backgroundColor: '#0E78C2'
  }
})

const mapStateToProps = store => ({
  myCards: store.cards.myCards,
  addingCard: store.cards.addingCard
});

export default connect(mapStateToProps)(MyCards);