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
import { View, ActivityIndicator } from 'react-native';


import getTheme from '../../native-base-theme/components';
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
                <Container>
                    <Header >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                               {this.state.item.day}
                               </Title>
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
                                    <Icon type="EvilIcons" name="pencil" />
                                    </Button>
                                </Right>
                            </ListItem>
                        }>
                    </List>
                </Container>
            </StyleProvider>
        );
    }
}




