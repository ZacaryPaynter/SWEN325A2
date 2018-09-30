import React, { Component } from 'react';
import { ListView, View, ActivityIndicator } from 'react-native';
import {
    Container, Header, Content, Button, Title, Card,
    Icon, List, ListItem, Text, Left, Right, Body
} from 'native-base';

const budgetUrl = 'http://agile-cove-43620.herokuapp.com/api/budget';

export class BudgetScreen extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            user: '',
            isLoading: true,
            basic: true,
            listViewData: [],
        };
    }


    componentDidMount() {
        return fetch(budgetUrl)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    listViewData: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    sendDelete(data) {
        return fetch(budgetUrl + '/' + data._id, {
            method: 'delete'
        })
            .then(response => response.json());
    }

    deleteRow(secId, rowId, rowMap, data) {
        this.sendDelete(data);
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Budget</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('NewBudget')}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>
                <Content >
                    <Card >
                        <Text>Income</Text>
                        <List
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem>
                                    <Text> {data.title} </Text>
                                </ListItem>}
                            renderLeftHiddenRow={data =>
                                <Button full onPress={() => alert(data.title + " " + data.amount)}>
                                    <Icon active name="information-circle" />
                                </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                                    <Icon active name="trash" />
                                </Button>}
                        />
                    </Card>
                    <Card style={{flex: 2}}>
                        <Text>Outcome</Text>
                        <List
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem>
                                    <Text> {data.title} </Text>
                                </ListItem>}
                            renderLeftHiddenRow={data =>
                                <Button full onPress={() => alert(data)}>
                                    <Icon active name="information-circle" />
                                </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                    <Icon active name="trash" />
                                </Button>}
                        />
                    </Card>

                </Content>
            </Container>
        );
    }
}