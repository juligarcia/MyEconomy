import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import { NativeRouter, Route, Switch } from "react-router-native";
import { Provider } from 'react-redux';
import { globalStyles } from './aux/globalStyles';
import { scaleSize } from './aux/dimensions';
import { ThemeProvider } from './theme/ThemeProvider';

import Home from './screens/Home';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <AppearanceProvider>
          <ThemeProvider>
            <View style={globalStyles.container}>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </View> 
          </ThemeProvider>
        </AppearanceProvider>
      </NativeRouter>
    </Provider>  
  );
}