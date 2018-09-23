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
    Right, Title, Content, Form, Item, Button
  } from 'native-base';

  export class LoginScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Login',
      };
    constructor(props) {
      super(props);
      this.state = { user: '' };
    }
  
    render() {
      return (
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
            <Button dark block onPress={() => this.props.navigation.navigate('Budget', {
                user: this.state.user
            })}>
            <Text>Login</Text>
          </Button>
          </Content>
        </Container>
      );
    }
  }
  
  