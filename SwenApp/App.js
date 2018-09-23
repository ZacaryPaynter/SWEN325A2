/**
* Planner App
* 
* @author kirita-rose escott
* @author zacary paynter
*
 */
import React, { Component, LogoTitle } from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/LoginScreen';
import { BudgetScreen } from './Screens/Budget/BudgetScreen';
import { TodoScreen } from './Screens/Todo/TodoScreen';


const RootStack = createDrawerNavigator(
  {
    Login: LoginScreen,
    Budget: BudgetScreen,
    Todo: TodoScreen
  },
  {
    initialRouteName: 'Todo',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
