/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Input, Label, Text, Icon, StyleProvider,
    Right, Title, Content, Form, Item, Button, List, ListItem
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import { View, ActivityIndicator } from 'react-native';
import commonColor from '../../native-base-theme/variables/commonColor';

export class ScheduleDayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { user: '', item: {}, isLoading: true };
    }

    render() {
        this.state.item = this.props.navigation.getParam('item', 'no item');

        var items = [];
        items = this.state.item.sched_times;

        return (
            <StyleProvider style={getTheme(commonColor)}>
            <View>
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title uppercase={false}>{this.state.item.day}</Title>
                    </Body>
                </Header>
                <List dataArray={items}
                    renderRow={(item) =>
                        <ListItem icon>
                            <Left>
                                <Text>{item.timeid}</Text>
                            </Left>
                            <Body>
                                <Text>{item.title}</Text>
                                <Text>{item.description}</Text>
                            </Body>
                            <Right>
                                <Button transparent >
                                    <Icon name='paper' />
                                </Button>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View>
            </StyleProvider>
        );
    }
}




