import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import MyExpandedCard from './layout';
import MyCardBar from '../MyCard/components/MyCardBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

class MyExpandedCardContainer extends PureComponent {
  constructor(props){
    super();
    this.state = {
      animH: new Animated.Value(props.cardData.height),
      animW: new Animated.Value(props.cardData.width),
      animateXY: new Animated.ValueXY({ x: props.cardData.xOff, y: (props.cardData.yOff - getStatusBarHeight()) }),
      loadingAnimation: true
    }
  }

  unExpand = () => {
    this.setState({ loadingAnimation: true })
    const { height, width, xOff, yOff } = this.props.cardData;
    Animated.parallel([
      Animated.timing(this.state.animW, {
        toValue: width,
        duration: 700,
        useNativeDriver: false
      }),
      Animated.timing(this.state.animH, {
        toValue: height,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.animateXY, {
        toValue: { x: xOff, y: yOff - getStatusBarHeight() },
        duration: 700, 
        useNativeDriver: false
      })
    ]).start(() => this.props.unExpand());
  };

  componentDidMount(){
    Animated.parallel([
      Animated.timing(this.state.animW, {
        toValue: Dimensions.get('screen').width,
        duration: 700,
        useNativeDriver: false
      }),
      Animated.timing(this.state.animH, {
        toValue: Dimensions.get('screen').height,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.animateXY, {
        toValue: { x: 0, y: 0 },
        duration: 700, 
        useNativeDriver: false
      })
    ]).start(() => this.setState({ loadingAnimation: false }));
  };

  render() {
    const { loadingAnimation } = this.state;
    const { cardName, closingDate, color } = this.props.card;
    const OnLoadingComponent = (
      <MyCardBar
        cardName={cardName}
        closingDate={closingDate}
        color={color}
      />
    );
    const ExpandedCard = <MyExpandedCard card={this.props.card} unExpand={this.unExpand} />;
    return (
      <Animated.View
        style={{
          width: this.state.animW,
          height: this.state.animH,
          top: this.state.animateXY.y,
          left: this.state.animateXY.x,
          backgroundColor: this.props.card.color,
          position: 'absolute',
          borderRadius: 10,
          zIndex: 1,
          padding: 10
        }}
      >
        {loadingAnimation ? OnLoadingComponent : ExpandedCard}
      </Animated.View>
    )
  };
};

export default MyExpandedCardContainer;