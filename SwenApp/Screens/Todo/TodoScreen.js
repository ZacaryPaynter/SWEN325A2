import React, { Component } from 'react';
import {
    Badge, Container, Header, Left, Body, Input, Label, Text, Icon, StyleProvider,
    Right, Tab, Tabs, TabHeading, Toast, Title, Content, Form, Item, Button, Picker, List, ListItem
} from 'native-base';
import { Alert } from 'react-native';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import PopupDialog from 'react-native-popup-dialog';
export class TodoScreen extends Component {



    static navigationOptions = {
        title: 'Todo',
    };

    constructor() {
        super();
        this.state = {
            TodoList: [],
            DoingList: [],
            DoneList: [],
            current: {
                title: "title",
                description: "description",
                _id: 13,
            },
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        this.setState({
            TodoList: [],
            DoingList: [],
            DoneList: [],
            current: this.state.current,
        });
        return fetch('http://agile-cove-43620.herokuapp.com/api/tasks')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: responseJson,
                }, function () {

                    var items = this.state.dataSource;

                    for (var i = 0; i < items.length; i++) {

                        if (items[i].list == 1) {
                            this.state.TodoList.push(items[i]);
                        } else if (items[i].list == 2) {
                            this.state.DoingList.push(items[i]);
                        } else {
                            this.state.DoneList.push(items[i]);
                        }
                    }
                    this.setState({
                        isLoading: false,

                    });
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    listItemPressed(item) {
        console.log(item.title);
    }

    updateCurrent(text) {
        item = this.state.current;
        item.title = text;
        this.setState({ current: item });
        
    }

    updateCurrentDes(text) {
        item = this.state.current;
        item.description = text;
        this.setState({ current: item });
        
    }

    updateList(list) {
        item = this.state.current;
        item.list = list;
        this.setState({ current: item });
    }

    submitChanges() {
        item = this.state.current;
        console.log(item);


        var url = 'http://agile-cove-43620.herokuapp.com/api/tasks/' + item._id;

        var object = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": item.title,
                "description": item.description,
                "list": item.list
            }
            )
        };

        fetch(url, object)
            .then((response) => response.text())
            .then((responseData) => {
                Toast.show({
                    text: 'Successfully edited tasks!',
                    buttonText: 'Okay'
                })
                this.update();

            })
            .catch(function (err) {
                Toast.show({
                    text: 'Unable to update tgask, please try again!',
                    buttonText: 'Okay'
                })
            });
    }

    submitDelete() {
        fetch('http://agile-cove-43620.herokuapp.com/api/tasks/' + this.state.current._id, {
            method: 'delete'
        })
            .then(response => {
                Toast.show({
                    text: 'Successfully removed task!',
                    buttonText: 'Okay'
                })
                this.update();
            }
            );


    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Todo</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate('NewTask')}>
                                <Icon name='add' />
                            </Button>
                            <Button transparent onPress={() => Alert.alert(
                                'How to Use the Todo!',
                                'To add a new item click the + button, to edit, remove, or move items select them from the list',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]
                            )}>
                                <Icon type="FontAwesome" name="question-circle" />
                            </Button>
                        </Right>
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading>
                            <Text>Todo</Text>
                            <Badge danger >
                                <Text style={{ color: 'black' }}>{this.state.TodoList.length}</Text>
                            </Badge>
                        </TabHeading>}>
                            <List dataArray={this.state.TodoList}
                                renderRow={(item) =>
                                    <ListItem icon onPress={() => {
                                        this.setState({
                                            current: item
                                        });
                                        this.popupDialog.show();
                                    }}>
                                        <Body>
                                            <Text>{item.title}</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.description}</Text>
                                        </Right>
                                    </ListItem>
                                }>
                            </List>
                        </Tab>
                        <Tab heading={<TabHeading>
                            <Text>Doing</Text>
                            <Badge success>
                                <Text style={{ color: 'black' }}>{this.state.DoingList.length}</Text>
                            </Badge>
                        </TabHeading>}>
                            <List dataArray={this.state.DoingList}
                                renderRow={(item) =>
                                    <ListItem icon onPress={() => {
                                        this.setState({
                                            current: item
                                        });
                                        this.popupDialog.show();
                                    }}>
                                        <Body>
                                            <Text>{item.title}</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.description}</Text>
                                        </Right>
                                    </ListItem>
                                }>
                            </List>
                        </Tab>
                        <Tab heading={<TabHeading>
                            <Text>Done</Text>
                            <Badge >
                                <Text style={{ color: 'black' }}>{this.state.DoneList.length}</Text>
                            </Badge>
                        </TabHeading>}>
                            <List dataArray={this.state.DoneList}
                                renderRow={(item) =>
                                    <ListItem icon onPress={() => {
                                        this.setState({
                                            current: item
                                        });
                                        this.popupDialog.show();
                                    }}>
                                        <Body>
                                            <Text>{item.title}</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.description}</Text>
                                        </Right>
                                    </ListItem>
                                }>
                            </List>
                        </Tab>
                    </Tabs>
                    <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }} style={{ margin: ' 20px' }}>
                        <Form >
                            <Item Label >
                                <Label>Title</Label>
                                <Input
                                    placeholder={this.state.current.title}
                                    onChangeText={(title) => this.updateCurrent(title)}
                                    value={this.state.current.title} />
                            </Item>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                placeholder="list"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: undefined }}
                                selectedValue={this.state.current.list}
                                onValueChange={(value) => this.updateList(value)}
                            >
                                <Picker.Item label="TODO" value="1" />
                                <Picker.Item label="DOING" value="2" />
                                <Picker.Item label="DONE" value="3" />
                            </Picker>
                            <Item Label >
                                <Label>Description</Label>
                                <Input
                                    placeholder={this.state.current.description}
                                    onChangeText={(text) => this.updateCurrentDes(text)}
                                    value={this.state.current.description} />
                            </Item>

                            <Button block onPress={() => this.submitChanges()}>
                                <Text>Submit</Text>
                            </Button>
                            <Button block danger onPress={() => this.submitDelete()}>
                                <Text>Remove</Text>
                            </Button>
                        </Form>
                    </PopupDialog>
                </Container>
            </StyleProvider >
        );
    }
}