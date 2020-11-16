import React, { useState } from 'react';
import { View, VirtualizedList } from 'react-native';
import MySearchBar from './components/MySearchBar';
import MyCreateBar from './components/MyCreateBar';
import MyQuickActionsBar from './components/MyQuickActionsBar';
import MyLROptions from './components/MyLROptions';
import { createActions, renderAction, onViewableItemsChanged } from './utils';
import styles from './styles';

const MyActionBar = ({ create }) => {
  const [options, setOptions] = useState({ left: undefined, right: undefined });
  const actions = createActions(create);
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
        onViewableItemsChanged={onViewableItemsChanged(setOptions)}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 90
        }}
        onScrollToIndexFailed={() => {}}
      />
      <MyLROptions left={options.left} right={options.right} />
    </View>
  );
};

export default MyActionBar;