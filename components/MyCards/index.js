import React, { useState, useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { connect } from 'react-redux';
import MyCard from '../MyCard';
import MyExpandedCard from '../MyExpandedCard';
import MyActionBar from './components/MyActionBar';
import NewPaymentModal from '../NewPaymentModal';
import * as cardActions from '../../redux/cards/actions';
import styles from './styles';

const MyCards = ({ myCards, addCard, addingCard, dispatch }) => {
  const [cardAction, setCardAction] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const selectCard = key => (width, height, xOff, yOff) => setSelectedCard({key, width, height, xOff, yOff});
  const width = useWindowDimensions().width;

  const [newPayment, setNewPayment] = useState(-1);
  const openNewPayment = key => () => setNewPayment(key);
  const nextId = myCards.find(card => card.key === newPayment)?.nextPaymentId;

  const configureCard = ({ item, index, separators }) => {
    const { cardName, color, key, closingDate, payments, cardLimit } = item;
    return(
      <MyCard
        id={key}
        key={key}
        cardName={cardName}
        color={color}
        payments={payments}
        closingDate={closingDate}
        selectCard={selectCard(key)}
        addPayment={openNewPayment(key)}
        cardLimit={cardLimit}
        setCardAction={action => setCardAction(action)}
      />
    )
  };

  const unExpand = () => setSelectedCard(null);

  return (
    <View style={styles.container}>
      {(cardAction === 'expand' && selectedCard) && (
        <MyExpandedCard
          card={myCards.find(card => card.key == selectedCard.key)}
          cardData={selectedCard}
          unExpand={unExpand}
        />
      )}
      <NewPaymentModal
        openModal={newPayment > -1}
        onClose={() => setNewPayment(-1)}
        addPayment={payment => dispatch(cardActions.addPayment(payment, newPayment))}
        nextId={nextId}
        incId={() => dispatch(cardActions.updateNextPaymentId(nextId + 1, newPayment))}
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

const mapStateToProps = store => ({
  myCards: store.cards.myCards,
  addingCard: store.cards.addingCard
});

export default connect(mapStateToProps)(MyCards);