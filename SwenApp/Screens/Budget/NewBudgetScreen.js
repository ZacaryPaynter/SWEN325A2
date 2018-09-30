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
  Right, Title, Content, Form, Item, Button, Picker
} from 'native-base';
import NumericInput from 'react-native-numeric-input';

export class NewBudgetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', title: '', amount: 0, value: '', isIncome: false, selected: undefined };
 }



  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({ amount: text })
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  submitForm() {
    if (this.selected == 'income') { this.isIncome = true; }
    this.state.amount = parseInt(this.state.value);
 
     var url = 'http://agile-cove-43620.herokuapp.com/api/budget';

     var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "title" : this.state.title,
        "amount" : this.state.amount,
        "income" : this.state.isIncome,
      })
  };
  
  fetch(url, object)
  .then((response) => response.text())
  .then((responseData) => {})
  .catch(function(err) {});
  
  }

  render() {
    return (
      <Container>
        <Header >
          <Body>
            <Title>New Budget</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item Label>
              <Label>Title</Label>
              <Input
                onChangeText={(title) => this.setState({ title })}
                value={this.state.title} />
            </Item>
            <Item Label>
              <Label>Amount</Label>
              <Input
                type="number"
                keyboardType="numeric"
                onChangeText={(value) => this.setState({ value})}
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
                <Picker.Item label="Income" value="key0" />
                <Picker.Item label="Outcome" value="key1" />
              </Picker>
            </Item>
          </Form>
          <Button block onPress={() => this.submitForm()}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

