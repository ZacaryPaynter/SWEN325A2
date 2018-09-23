/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Input, Label, Text, Icon,
  Right, Title, Content, Form, Item, Button, List, ListItem
} from 'native-base';
import { View, ActivityIndicator } from 'react-native';

export class BudgetScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Budget',
  };
  constructor(props) {
    super(props);
    this.state = { user: '', isLoading: true };
  }

  componentDidMount() {
    return fetch('http://agile-cove-43620.herokuapp.com/api/budget')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    var items = [];
    items = this.state.dataSource;

    return (
      <View>
        <Header >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Budget</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <List dataArray={items}
          renderRow={(item) =>
            <ListItem>
              <Text>{item.title}</Text>
              <Text>{item.amount}</Text>
            </ListItem>
          }>
        </List>
      </View>
    );
  }
}







