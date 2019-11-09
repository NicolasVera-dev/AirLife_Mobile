import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


import LoginActivity from './component/LoginActivity';
import SecondPage from './component/SecondPage';

const RootStack = createStackNavigator({
    First: { screen: LoginActivity },
    Second: { screen: SecondPage }
  },     
  {
    initialRouteName: 'First',
  }
);
const App = createAppContainer(RootStack);
export default App;
