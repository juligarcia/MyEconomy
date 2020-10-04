import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, SafeAreaView, View } from 'react-native';
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: '#181818'
  },
});
