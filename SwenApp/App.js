/**
* Planner App
* 
* @author kirita-rose escott
* @author zacary paynter
*
 */
import React, { Component, LogoTitle } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Root } from './node_modules/native-base';
import { LoginScreen } from './Screens/LoginScreen';
import { BudgetScreen } from './Screens/Budget/BudgetScreen';
import { NewBudgetScreen } from './Screens/Budget/NewBudgetScreen'
import { EditBudgetScreen } from './Screens/Budget/EditBudgetScreen'

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
  EditBudget: EditBudgetScreen,
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
    return (
      <Root>
        <RootStack />
      </Root>);
  }
}
