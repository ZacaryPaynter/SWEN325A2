/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Input, Label, Text, Icon, Toast,
  Right, Title, Content, Form, Item, Button, Picker, StyleProvider
} from 'native-base';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export class EditBudgetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', title: '', item: {}, amount: 0, value: '', isIncome: true, selected: undefined };

  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({ amount: text })
  }

  onValueChange(value) {
    if (value == 'outcome') {
      this.state.isIncome = false
    }
    else { this.state.isIncome = true }
    this.setState({
      selected: value
    });
  }

  submitForm() {

    this.state.amount = parseInt(this.state.value);

    if (this.state.amount > 0) {
      this.state.item.amount = this.state.amount
    }
    if (this.state.title != '') {
      this.state.item.title = this.state.title
    }
    this.state.item.income = this.state.isIncome

    var url = 'http://agile-cove-43620.herokuapp.com/api/budget/' + this.state.item._id;

    var object = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": this.state.item.title,
        "amount": this.state.item.amount,
        "income": this.state.item.income,
      })
    };

    fetch(url, object)
      .then((response) => response.text())
      .then((responseData) => {
        Toast.show({
          text: 'Successfully edited budget!',
          buttonText: 'Okay',
          type: 'success'
        })
        this.setState({
          title: '',
          amount: 0,
          selected: undefined,
          value : '',
          isIncome: true
        });
      })
      .catch(function (err) {
        Toast.show({
          text: 'Unable to edit budget, please try again!',
          buttonText: 'Okay',
          type: 'danger'
        })
      });


  }

  cleanNav() {
    this.props.navigation.reset;
    this.props.navigation.push('Budget')
}

  render() {
    this.state.item = this.props.navigation.getParam('item', 'no item');

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header >
            <Left>
              <Button transparent onPress={() => this.cleanNav()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>EDIT BUDGET</Title>
            </Body>
          </Header>
          <Content>
            <Form>
              <Item Label>
                <Label>Title</Label>
                <Input
                  placeholder={this.state.item.title}
                  onChangeText={(title) => this.setState({ title })}
                  value={this.state.title} />
              </Item>
              <Item Label>
                <Label>Amount</Label>
                <Input
                  placeholder={this.state.item.amount.toString()}
                  type="number"
                  keyboardType="numeric"
                  onChangeText={(value) => this.setState({ value })}
                  value={this.state.value} />
              </Item>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Income" value="income" />
                  <Picker.Item label="Outcome" value="outcome" />
                </Picker>
              </Item>
            </Form>
            <Button block onPress={() => this.submitForm()}>
              <Text>Submit</Text>
            </Button>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

