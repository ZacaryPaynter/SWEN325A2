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
    Right, Title, Content, Form, Item, Button, List, ListItem, Thumbnail,
} from 'native-base';
import { View, ActivityIndicator, Image } from 'react-native';


import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export class ScheduleDayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { user: '', item: {}, isLoading: true };
    }

    getTitle(item) {
        if (item.title == '') return 'Free Time'
        else return item.title
    }

    getDesc(item) {
        if (item.description == '') return 'Add New Schedule'
        else return item.description
    }

    getAvatar(item) {
        if (item.category == '') return 'asset:/leisure.png'
        else return 'asset:/' + item.category + '.png'
    }

    getButton(item) {
        if (item.category == '') {
            return 'plus'
        } else {
            return 'pencil'
        }
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
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail source={{ uri: this.getAvatar(item) }} style={{ width: 40, height: 40 }} />
                                </Left>
                                <Body>
                                    <Text>{this.getTitle(item)}</Text>
                                    <Text note>{this.getDesc(item)}</Text>
                                </Body>
                                <Right>
                                    <Text note>{item.timeid}</Text>
                                    <Button small transparent onPress={() => this.props.navigation.navigate('EditSchedule', {
                                        item: item, user: this.state.user, dayItem: this.state.item 
                                    })} style={{ height: 25}}>
                                        <Icon type="EvilIcons" name={this.getButton(item)} />
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




