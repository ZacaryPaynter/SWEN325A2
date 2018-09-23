/**
* Planner App
* 
* @author kirita-rose escott
* @author zacary paynter
*
 */
import React, { Component, LogoTitle } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/LoginScreen';
import { BudgetScreen } from './Screens/Budget/BudgetScreen';
import { TodoScreen } from './Screens/Todo/TodoScreen';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const user = this.props.navigation.getParam('user', '');
    alert('Welcome '+user+'!');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
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
