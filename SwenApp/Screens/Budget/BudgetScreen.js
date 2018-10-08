import React, { Component } from 'react';
import { ListView, View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import {
    Container, Header, Content, Button, Title, Card, StyleProvider,
    Icon, List, ListItem, Text, Left, Right, Body, CardItem
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

const budgetUrl = 'http://agile-cove-43620.herokuapp.com/api/budget';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainContainer: {
        height: deviceHeight / 2,
        width: deviceWidth,
    }
});

export class BudgetScreen extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            user: '',
            isLoading: true,
            basic: true,
            listViewData: [],
            incomes: [],
            outcomes: []
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
                    this.state.incomes = [];
                    this.state.outcomes = [];
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

    checkIncome(data, flag){
        if (data.income==flag){
            return(<CardItem>
                   <Body>
                                <Text>{data.title}</Text>
                            </Body>
                            <Right>
                            <Text>${data.amount}</Text>
                            </Right>
        </CardItem>)
        }
    }

    editBudget(data){
       this.props.navigation.navigate('EditBudget', {
            item: data, user: this.state.user
        })}
    

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
            }

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const income = true;
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
                        <Title>Budget</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('NewBudget')}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>
                <Container style={{ width: styles.mainContainer.width, height: styles.mainContainer.height }}>
                    <Card >
                        <CardItem header >
                            <Text>INCOME</Text>
                        </CardItem>
                        <List
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={ data => 
                                    this.checkIncome(data, true)
                                }
                            renderLeftHiddenRow={data =>
                                <Button full info onPress={() => this.editBudget(data)}>
                                    <Icon active name="information-circle" />
                                </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                                    <Icon active name="trash" />
                                </Button>}
                        />
                    </Card>

                </Container>
                <Container style={{ width: styles.mainContainer.width, height: styles.mainContainer.height }}>
                
                    <Card >
                    <CardItem header >
                        <Text>OUTCOME</Text>
                    </CardItem>
                        <List
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data => 
                                this.checkIncome(data, false)
                            }
                            renderLeftHiddenRow={data =>
                                <Button full info onPress={() => this.editBudget(data)}>
                                    <Icon active name="information-circle" />
                                </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                                <Icon active name="trash" />
                            </Button> 
                            }
                        />
                    </Card>

                </Container>

            </Container>
            </StyleProvider>
        );
    }
}