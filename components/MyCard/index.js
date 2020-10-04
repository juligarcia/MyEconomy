import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import MyCardBar from './components/MyCardBar';
import MyCardSummary from './components/MyCardSummary';
import MyDummyCard from '../MyDummyCard';
import { scaleSize } from '../../aux/dimensions';
import { globalStyles } from '../../aux/globalStyles';

const MyCard = ({ cardName, color, closingDate, payments, selectCard = () => {}, addPayment, dummy = false }) => {

  const [cardRef, setCardRef] = useState(null);

  const expandCard = () => cardRef.measure(
    (fx, fy, width, height, px, py) => {
      selectCard(width, height, px, py);
    }
  );
  
  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: 10,
      width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
        marginBottom: '2%'
    },
    content: {
      borderRadius: 10
    },
    container: {
      padding: scaleSize(3),

      backgroundColor: color,
      width: scaleSize(90),
      height: scaleSize(40)
    },
    scrollView: {
      height: scaleSize(40)
    },
    smallContainer: {
      borderRadius: 0,
      width: scaleSize(30),
      height: scaleSize(40)
    },
    dummy: {
      borderColor:'white',
      borderWidth: scaleSize(0.5)
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    delete: {
      backgroundColor: '#DC3636',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    },
    add: {
      backgroundColor: '#0E78C2',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10
    }
  });

  const DeleteIcon = <FontAwesome5 name="trash" size={scaleSize(6)} color="white" />;
  const AddIcon = <FontAwesome name="plus" size={scaleSize(6)} color="white" />;

  const animatedScale = useRef(new Animated.Value(1)).current;
  const onPressAnimation = callback => () => {
    Animated.timing(animatedScale, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: false
    }).start(callback);
  }

  return (
    <View style={styles.wrapper}>
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.content}
      snapToInterval={scaleSize(30)}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      horizontal
      directionalLockEnabled
      contentOffset={{
        x: scaleSize(30),
        y: 0
      }}
    >
    {[
      !dummy && <TouchableHighlight
        key={0}
      >
        <MyDummyCard
          key={1}
          containerStyle={[styles.smallContainer, styles.delete, styles.center]}
          Icon={DeleteIcon}
        />
      </TouchableHighlight>,
      <TouchableWithoutFeedback
        onPress={expandCard}
        key={2}
      >
        <View ref={setCardRef} key={3} style={[globalStyles.centered, styles.container, dummy && styles.dummy]}>
          <MyCardBar
            key={4}
            cardName={cardName}
            closingDate={closingDate}
            color={color}
          />
          <MyCardSummary
            key={5}
            payments={payments}
            color={color}
          />
        </View>
      </TouchableWithoutFeedback>,
      !dummy && <TouchableHighlight
        onPress={onPressAnimation(addPayment)}
        key={6}
      >
        <MyDummyCard
          key={7}
          containerStyle={[styles.smallContainer, styles.add, styles.center]}
          Icon={AddIcon}
          before
        />
      </TouchableHighlight>
    ]}
    </ScrollView>
    </View>
  )
};

export default MyCard;