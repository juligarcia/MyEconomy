import React, { useState } from 'react';
import { FlatList, View, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import MyDummyCard from '../../../MyDummyCard';
import { AntDesign } from '@expo/vector-icons'; 
import MyButton from '../../../MyButton';
import MyModal from '../../../MyModal';
import NewPayment from '../../../NewPayment';

const InitialPayments = ({ addCardData, nextStep }) => {

  const [payments, updatePayments] = useState([]);
  const [paymentId, updateId] = useState(0);
  const [openAddPayment, setOpen] = useState(false);

  const addPayment = payment => {
    updatePayments(prevState => [...prevState, payment]);
  };

  const onSubmit = payments => () => {
    addCardData(payments);
    nextStep();
  };

  const renderPayment = ({ item }) => {
    const { paymentAlias, paymentTotal, instalments, monthly } = item;
    return(
      <MyDummyCard
        label={
          `${paymentAlias}: $${paymentTotal} ${instalments > 1 ? (
            `in ${instalments} instalments`
          ) : (
            ''
          ) || monthly ? ', Monthly payments' : ''}`}
        labelStyle={styles.dummy}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MyModal
        openModal={openAddPayment}
        content={
          <NewPayment
            addPayment={addPayment}
            onClose={() => setOpen(false)}
            nextId={paymentId}
            incId={() => updateId(prevState => prevState + 1)}
          />
        }
        containerStyle={styles.addPaymentContainer}
        position="flex-start"
      />
      <FlatList
        style={styles.list}
        keyExtractor={item => item.key.toString()}
        ListHeaderComponent={
          <MyDummyCard
            label="Initial Payments"
            containerStyle={styles.dummyContainer}
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
        data={payments}
        renderItem={renderPayment}
      />
      <MyButton
        content="Add payments!"
        onPress={onSubmit({ payments })}
        styles={{
          container: styles.button,
          text: styles.buttonContent
        }}
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
    height: '100%',
    marginTop: '5%',
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
  },
  listItem: {
    height: '30%'
  },
  button: {
    padding: '2%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: '5%'
  },
  buttonContent: {
    color: 'white',
    fontSize: 20
  }
});

export default InitialPayments;
