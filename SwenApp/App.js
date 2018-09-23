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

import { ScheduleScreen } from './Screens/Schedule/ScheduleScreen';
import { ScheduleDayScreen } from './Screens/Schedule/ScheduleDayScreen';


const RootStack = createDrawerNavigator(
  {
    Login: LoginScreen,
    Budget: BudgetScreen,
    Todo: TodoScreen,
    Schedule: ScheduleScreen,
    ScheduleDay: ScheduleDayScreen,

  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
