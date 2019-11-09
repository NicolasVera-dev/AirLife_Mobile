import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


import LoginActivity from './component/LoginActivity';
import HomeActivity from './component/HomeActivity';
import RegisterActivity from './component/RegisterActivity';

const RootStack = createStackNavigator({
    First: { screen: LoginActivity },
    Home: { screen: HomeActivity },
    Register: { screen: RegisterActivity },
  },
  {
    initialRouteName: 'First',
  }
);
const App = createAppContainer(RootStack);
export default App;
