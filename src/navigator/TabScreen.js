import React from 'react'
import { AsyncStorage } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import SensorScreen from '../screens/SensorScreen';

const SignoutScreen = () => {}

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home" color={tintColor} size={25} />
            )
        }
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: {
            tabBarLabel: 'Informations',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-information-circle" color={tintColor} size={25} />
            )
        }
    },
    Sensor: {
        screen: SensorScreen,
        navigationOptions: {
            tabBarLabel: 'Capteurs',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-flower" color={tintColor} size={25} />
            )
        }
    },
    Signout: {
        screen: SignoutScreen,
        navigationOptions: {
            tabBarLabel: 'Déconnexion',
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="logout" color={tintColor} size={20} />
            ),
            tabBarOnPress: async ({navigation}) => {
                await AsyncStorage.clear();
                navigation.navigate('Auth');
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        showIcon: true
    }
});

TabScreen.navigationOptions = {
  header: null
};
