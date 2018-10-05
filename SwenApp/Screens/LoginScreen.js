/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Input, Label, Text,
  Right, Title, Content, Form, Item, Button, StyleProvider
} from 'native-base';

import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

export class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header >
            <Body>
              <Title>Login</Title>
            </Body>
          </Header>
          <Content>
            <Form>
              <Item Label>
                <Label>Username</Label>
                <Input
                  onChangeText={(user) => this.setState({ user })}
                  value={this.state.user} />
              </Item>
            </Form>
            <Button block onPress={() => this.props.navigation.navigate('Budget', {
              user: this.state.user
            })}>
              <Text>Login</Text>
            </Button>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

