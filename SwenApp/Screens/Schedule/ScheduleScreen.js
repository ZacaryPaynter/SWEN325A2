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

export class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Schedule',
    };

    constructor(props) {
        super(props);
        this.state = { user: '', isLoading: true };
    }

    componentDidMount() {
        return fetch('http://agile-cove-43620.herokuapp.com/api/schedule')
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
                        <Title>Schedule</Title>
                    </Body>
                </Header>
                <List dataArray={items}
                    renderRow={(item) =>
                        <ListItem icon>
                            <Body>
                                <Text>{item.day}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.props.navigation.navigate('ScheduleDay', {
                                    item: item, user: this.state.user
                                })}>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View>
        );
    }
}




