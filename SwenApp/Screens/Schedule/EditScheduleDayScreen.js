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

export class EditScheduleDayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', title: '', description: '', category:'', item: {}, dayItem: {},  value: '',};

  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({ amount: text })
  }

  onValueChange(value) {
    this.setState({
      category: value
    });
  }

  submitForm() {
    var target = this.state.item.timeid
    var title = this.state.title
    var desc = this.state.description
    var cat = this.state.category

    this.state.dayItem.sched_times.forEach(function (element) {
      if (element.timeid==target){
        element.title = title
        element.description = desc
        element.category = cat
        return
      }});
       
      var url = 'http://agile-cove-43620.herokuapp.com/api/schedule/' + this.state.dayItem._id;

      var object = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "day" : this.state.dayItem.day,
            "sched_times": this.state.dayItem.sched_times,
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
        })
        .catch(function (err) {
          Toast.show({
            text: 'Unable to edit budget, please try again!',
            buttonText: 'Okay',
            type: 'danger'
          })
        });
    }

  render() {
    this.state.dayItem = this.props.navigation.getParam('dayItem', 'no dayItem');
    this.state.item = this.props.navigation.getParam('item', 'no item');

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header >
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>EDIT SCHEDULE</Title>
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
              <Label>Description</Label>
                <Input
                  placeholder={this.state.item.description}
                  onChangeText={(description) => this.setState({ description })}
                  value={this.state.description} />
              </Item>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.category}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Work" value="work" />
                  <Picker.Item label="School" value="school" />
                  <Picker.Item label="Home" value="home" />
                  <Picker.Item label="Misc" value="misc" />
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

