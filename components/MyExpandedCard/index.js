import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import MyExpandedCard from './layout';
import MyCardBar from '../MyCard/components/MyCardBar';
import MyCardSummary from '../MyCard/components/MyCardSummary';
import MyLoadingComponent from './components/MyLoadingComponent';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scaleSize } from '../../aux/dimensions';

class MyExpandedCardContainer extends PureComponent {
  constructor(props){
    super();
    this.state = {
      animH: new Animated.Value(props.cardData.height),
      animW: new Animated.Value(props.cardData.width),
      animPaddingTop: new Animated.Value(scaleSize(3)),
      animateXY: new Animated.ValueXY({ x: props.cardData.xOff, y: (props.cardData.yOff - getStatusBarHeight()) }),
      loadingAnimation: true,
      isMounting: true
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
      }),
      Animated.timing(this.state.animPaddingTop, {
        toValue: scaleSize(3),
        duration: 700,
        useNativeDriver: false
      })
    ]).start(() => this.props.unExpand());
  };

  componentDidMount(){
    Animated.parallel([
      Animated.timing(this.state.animW, {
        toValue: Dimensions.get('screen').width,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(this.state.animH, {
        toValue: Dimensions.get('screen').height,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(this.state.animateXY, {
        toValue: { x: 0, y: - getStatusBarHeight()},
        duration: 500, 
        useNativeDriver: false
      }),
      Animated.timing(this.state.animPaddingTop, {
        toValue: getStatusBarHeight(),
        duration: 500,
        useNativeDriver: false
      })
    ]).start(() => this.setState({ loadingAnimation: false, isMounting: false }));
  };

  render() {
    const { loadingAnimation, isMounting} = this.state;

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
          padding: scaleSize(3),
          paddingTop: this.state.animPaddingTop
        }}
      >
        {loadingAnimation ? (
          <MyLoadingComponent isMounting={isMounting} card={this.props.card} />
        ) : (
          <MyExpandedCard card={this.props.card} unExpand={this.unExpand} />
        )}
      </Animated.View>
    )
  };
};

export default MyExpandedCardContainer;