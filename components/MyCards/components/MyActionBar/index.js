import React, { useState } from 'react';
import { View, VirtualizedList, StyleSheet } from 'react-native';
import MySearchBar from './components/MySearchBar';
import MyCreateBar from './components/MyCreateBar';
import MyQuickActionsBar from './components/MyQuickActionsBar';
import MyLROptions from './components/MyLROptions';

const MyActionBar = ({ create }) => {
  const [options, setOptions] = useState({ left: undefined, right: undefined });
  const actions = [
    {
      Component: MyQuickActionsBar,
      key: 0
    },
    {
      Component: MySearchBar,
      key: 1
    },
    {
      Component: MyCreateBar,
      props: {
        create
      },
      key: 2
    }
  ];
  const renderAction = ({ item, index, separators }) => {
    const { Component, props } = item;
    return (
      <Component {...props} />
    );
  };
  const onViewableItemsChanged = ({ viewableItems }) => {
    const optionLabels = ['Settings', 'Search', 'Create Card'];
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
        style={styles.container}
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
        getItemCount={data => data?.length}
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 10
  }
});

export default MyActionBar;