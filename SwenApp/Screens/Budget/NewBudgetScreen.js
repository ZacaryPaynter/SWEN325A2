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
    this.state = { user: '', title: '', amount: 0, isIncome: false, selected: undefined};
  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({amount: text})
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
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
              <NumericInput onChange={(amount) => this.setState({amount})} 
              value={this.state.amount}/>
            </Item>
            <Item>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="Income or Outcome?"
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
        </Content>
      </Container>
    );
  }
}

