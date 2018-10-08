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


export class NewTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { user: '', title: '', description: ' ', list: 1 };
    }

    onValueChange(value) {
        this.setState({
            list: value
        });
    }

    submitForm() {



        if (this.state.title != '') {
            var url = 'http://agile-cove-43620.herokuapp.com/api/tasks';

            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "title": this.state.title,
                    "description": this.state.description,
                    "list": this.state.list,
                })
            };

            fetch(url, object)
                .then((response) => response.text())
                .then((responseData) => {
                    Toast.show({
                        text: 'Successfully added task!',
                        buttonText: 'Okay'
                    })
                    this.setState({
                        user: '',
                        title: '',
                        description: ' ',
                        list: 1
                    });

                })
                .catch(function (err) {
                    Toast.show({
                        text: 'Unable to add task, please try again!',
                        buttonText: 'Okay'
                    })
                });
        }
        else {
            Toast.show({
                text: 'Please enter form details!',
                buttonText: 'Okay'
            })
        }

    }

    cleanNav() {
        this.props.navigation.reset;
        this.props.navigation.push('Todo')
    }
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header >
                        <Left>
                            <Button transparent onPress={() =>
                                this.cleanNav()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>NEW Task</Title>
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
                                <Label>Description</Label>
                                <Input
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
                                    selectedValue={this.state.list}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Todo" value="1" />
                                    <Picker.Item label="Doing" value="2" />
                                    <Picker.Item label="Done" value="3" />
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

