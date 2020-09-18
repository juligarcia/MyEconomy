import React, { useState } from 'react';
import { FlatList, View, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import MyDummyCard from '../../../MyDummyCard';
import MyLabel from '../../../MyLabel';
import { AntDesign } from '@expo/vector-icons'; 
import MyButton from '../../../MyButton';
import MyModal from '../../../MyModal';
import NewPayment from '../../../NewPayment';

const InitialPayments = ({ addCardData, nextStep  }) => {

  const [payments, updatePayments] = useState([]);
  const [openAddPayment, setOpen] = useState(false);

  const addPayment = payment => {
    updatePayments(prevState => [...prevState, payment]);
  };

  return (
    <View style={styles.container}>
      <MyModal
        openModal={openAddPayment}
        content={
          <NewPayment
            addPayment={addPayment}
          />
        }
        containerStyle={styles.addPaymentContainer}
        position="flex-start"
      />
      <TouchableHighlight >
        <MyLabel
          styles={{
            text: styles.title,
            container: styles.titleContainer
          }}
          text="Add payment!" />
      </TouchableHighlight>
      <FlatList
        style={styles.list}
        ListHeaderComponent={
          <MyDummyCard
            label="Initial Payments"
            containerStyle={styles.container}
            labelStyle={styles.dummy}
            Icon={
              <MyButton
                content={
                  <AntDesign name="plussquare" size={20} color="gray" />
                }
                onPress={() => setOpen(true)}
              />
            }
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '90%',
    height: '100%'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  titleContainer: {
    marginBottom: '5%',
    marginTop: '5%'
  },
  dummy: {
    color: 'gray' 
  },
  addPaymentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
    backgroundColor: 'dodgerblue',
    borderRadius: 10
  }
});

export default InitialPayments;
