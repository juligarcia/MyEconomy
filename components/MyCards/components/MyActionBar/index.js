import React, { useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  VirtualizedList,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { scaleSize } from '../../../../aux/dimensions';
import MySearchBar from './components/MySearchBar';
import MyCreateBar from './components/MyCreateBar';
import MyQuickActionsBar from './components/MyQuickActionsBar';
import MyLROptions from './components/MyLROptions';

const MyActionBar = ({ create }) => {
  const [options, setOptions] = useState({ left: undefined, right: undefined });
  const actions = [
    {
      Component: MyQuickActionsBar,
      key: 0,
      label: 'Settings' 
    },
    {
      Component: MySearchBar,
      key: 1,
      label: 'Search payment'
    },
    {
      Component: MyCreateBar,
      props: {
        create
      },
      key: 2,
      label: 'Create Card'
    }
  ];
  const renderAction = ({ item, index, separators }) => {
    const { Component, props } = item;
    return (
      <Component {...props} />
    );
  };
  const onViewableItemsChanged = ({ viewableItems }) => {
    const optionLabels = ['Settings', 'Search payment', 'Create Card'];
    if(viewableItems.length){
      const index = viewableItems[0].index;
      const left = index - 1 < 0 ? undefined : index - 1;
      const right = index + 1 >= optionLabels.length ? undefined : index + 1;
      const currentOptions = {
        left: left !== undefined ? optionLabels[left] : undefined,
        right: right !== undefined ? optionLabels[right] : undefined
      };
      setOptions(currentOptions);
    };
  }
  return (
    <View>
      <VirtualizedList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        horizontal
        directionalLockEnabled
        initialScrollIndex={1}
        data={actions}
        renderItem={renderAction}
        keyExtractor={item => item.key.toString()}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 90
        }}
        onScrollToIndexFailed={() => {}}
      >
        {[
          <MyQuickActionsBar key={0} />,
          <MySearchBar key={1}/>,
          <MyCreateBar key={2} create={create} />
        ]}
      </VirtualizedList>
      <MyLROptions left={options.left} right={options.right} />
    </View>
  );
};

export default MyActionBar;