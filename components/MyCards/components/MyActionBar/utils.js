import React from 'react';
import MySearchBar from './components/MySearchBar';
import MyCreateBar from './components/MyCreateBar';
import MyQuickActionsBar from './components/MyQuickActionsBar';

export const createActions = create => [
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

export const renderAction = ({ item, index, separators }) => {
  const { Component, props } = item;
  return (
    <Component {...props} />
  );
};

export const onViewableItemsChanged = setOptions => ({ viewableItems }) => {
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
};