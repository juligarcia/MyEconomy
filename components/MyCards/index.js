import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, useWindowDimensions, View, Button, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons'; 
import MyDummyCard from '../MyDummyCard';
import MyCard from '../MyCard';

const MyCards = ({ myCards, addCard, addingCard }) => {

  const width = useWindowDimensions().width;

  const AddIcon = <Feather name="chevrons-up" size={20} color="#a6a6a6" />;

  const configureCard = ({ item, index, separators }) => {
    const { cardName, color, key, closingDate } = item;
    return(
      <MyCard key={key} cardName={cardName} color={color} closingDate={closingDate}/>
    )
  };
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={addingCard} onRefresh={addCard} />
        }
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <MyDummyCard
            label="Create New Card!"
            labelStyle={styles.addLabel}
            Icon={AddIcon}
            both
            containerStyle={styles.addConatiner}
          />
        }
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
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  }
})

const mapStateToProps = store => ({
  myCards: store.cards.myCards,
  addingCard: store.cards.addingCard
});

export default connect(mapStateToProps)(MyCards);