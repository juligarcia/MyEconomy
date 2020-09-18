import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
import { NativeRouter, Route, Switch } from "react-router-native";
import { Provider } from 'react-redux';

import Home from './screens/Home';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <SafeAreaView style={styles.container}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </SafeAreaView> 
      </NativeRouter>
    </Provider>  
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
