import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  TouchableWithoutFeedback,
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
  
  const width = useWindowDimensions().width;

  const styles = StyleSheet.create({
    container: {
      padding: scaleSize(3),
      borderRadius: 10,
      marginBottom: scaleSize(3),
      marginTop: scaleSize(3),
      marginRight: scaleSize(5),
      marginLeft: scaleSize(5),
      backgroundColor: color,
      width: scaleSize(90),
      height: scaleSize(40)
    },
    scrollView: {
      height: scaleSize(40)
    },
    smallContainer: {
      marginBottom: scaleSize(3),
      marginTop: scaleSize(3),
      borderRadius: 10,
      width: scaleSize(30)
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
      backgroundColor: '#DC3636'
    },
    add: {
      backgroundColor: '#0E78C2'
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
    <ScrollView
      style={dummy && styles.scrollView}
      snapToInterval={width * 0.3}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      horizontal
      directionalLockEnabled
      contentOffset={{
        x: width * 0.3,
        y: 0
      }}
    >
    {[
      !dummy && <TouchableWithoutFeedback
        key={0}
      >
        <MyDummyCard
          key={1}
          containerStyle={[styles.smallContainer, styles.delete, styles.center]}
          Icon={DeleteIcon}
        />
      </TouchableWithoutFeedback>,
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
      !dummy && <TouchableWithoutFeedback
        onPress={onPressAnimation(addPayment)}
        key={6}
      >
        <Animated.View style={[styles.smallContainer, styles.add, styles.center, { scale: animatedScale }]}>
          <MyDummyCard
            key={7}
            containerStyle={[styles.add, styles.center]}
            Icon={AddIcon}
            before
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    ]}
    </ScrollView>
  )
};

export default MyCard;