/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Input, Label, Text, Icon, StyleProvider, Grid, Col, Row,
    Right, Title, Content, Form, Item, Button, List, ListItem, Card, CardItem
} from 'native-base';
import { View, ActivityIndicator, Alert } from 'react-native';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export class ScheduleScreen extends Component {
    static navigationOptions = {
        title: 'Schedule',
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

            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Schedule</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => Alert.alert(
                                'How to Use the Schedule!',
                                'Monday-Sunday each has their own page of scheduled events (8am-6pm) - navigate to the day you want and see everything you have on that day. Simply select an event to add, remove or edit it!',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]
                            )}>
                                <Icon type="FontAwesome" name="question-circle" />
                            </Button>
                        </Right>
                    </Header>
                        <Card>
                            <List dataArray={items}
                                renderRow={(item) =>
                                    <CardItem button onPress={() => this.props.navigation.navigate('ScheduleDay', {
                                        item: item, user: this.state.user
                                    })}>
                                        <Body>
                                            <Icon name="calendar" />
                                        </Body>
                                        <Right>
                                        <Text uppercase={true}>{item.day}</Text>
                                        </Right>
                                    </CardItem>}>
                            </List>
                        </Card>
                </Container>
            </StyleProvider>
        );
    }
}




