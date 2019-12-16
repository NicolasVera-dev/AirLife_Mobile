import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { TabScreen } from './src/navigator/TabScreen'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'

const AppStack = createStackNavigator({ TabScreen });

const AuthStack = createStackNavigator({
  Signin: LoginScreen,
  Signup: {
    screen:RegisterScreen
  },
  ForgotPassword : {
    screen:ForgotPasswordScreen
  }
});

export default createAppContainer(
  createSwitchNavigator({
        Starter: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Starter'
    }
));
