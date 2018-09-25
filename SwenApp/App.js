/**
* Planner App
* 
* @author kirita-rose escott
* @author zacary paynter
*
 */
import React, { Component, LogoTitle } from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/LoginScreen';
import { BudgetScreen } from './Screens/Budget/BudgetScreen';
import { NewBudgetScreen } from './Screens/Budget/NewBudgetScreen'

import { TodoScreen } from './Screens/Todo/TodoScreen';

import { ScheduleScreen } from './Screens/Schedule/ScheduleScreen';
import { ScheduleDayScreen } from './Screens/Schedule/ScheduleDayScreen';

const SchedStack = createStackNavigator({
  Schedule: ScheduleScreen,
  ScheduleDay: ScheduleDayScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const BudStack = createStackNavigator({
  Budget: BudgetScreen,
  NewBudget: NewBudgetScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const TodoStack = createStackNavigator({
  Todo: TodoScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Budget: BudStack,
    Todo: TodoStack,
    Schedule: SchedStack
  }
);

const RootStack = createStackNavigator({
  Login: LoginScreen,
  Drawer: DrawerStack,
},
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
