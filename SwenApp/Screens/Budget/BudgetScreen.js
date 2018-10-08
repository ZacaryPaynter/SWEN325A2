import React, { Component } from 'react';
import { ListView, View, ActivityIndicator, Dimensions, StyleSheet, Alert } from 'react-native';
import {
    Container, Header, Content, Button, Title, Card, StyleProvider, Toast,
    Icon, List, ListItem, Text, Left, Right, Body, CardItem,
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
        };
    }

    calculateOverallBudget(){
        //reset the totals
        var incomes = 0
        var outcomes = 0
        var spending = 0

        this.state.listViewData.forEach(function(element) {
            if (element.income==true){incomes = incomes + parseInt(element.amount) }
            else { outcomes = outcomes + parseInt(element.amount) }
          });

        spending = incomes - outcomes

        Alert.alert(
            'Overall Budget Information',
            'Total Income: $'+incomes+' Total Outcome: $'+outcomes+' Total Spending Money Left: $'+spending,
             [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
             ])

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
                    <Button transparent onPress={() => this.calculateOverallBudget()}>
                    <Icon name="information-circle" />
                    </Button>
                    <Button transparent onPress={() => this.props.navigation.navigate('NewBudget')}>
                            <Icon name='add' />
                        </Button>
                    <Button transparent onPress={() =>Alert.alert(
  'How to Use the Budget!',
  'To add a new item click the + button, to edit an item slide right, to remove an item slide left, to see your overall budget click the i button!',
   [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]
)}>
                             <Icon type="FontAwesome" name="question-circle" />
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
                                    <Icon type="FontAwesome" name="edit" />
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