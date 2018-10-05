import React, { Component } from 'react';
import {
   Badge, Container, Header, Left, Body, Input, Label, Text, Icon, StyleProvider,
    Right, Tab,Tabs, TabHeading, Title, Content, Form, Item, Button, List, ListItem
  } from 'native-base';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export class TodoScreen extends Component {

    static navigationOptions = {
        title: 'Todo',
    };

    constructor(){
        super();
        this.state = {
             TodoList:  [],
             DoingList: [], 
             DoneList: []
        }
    }

    componentDidMount(){
        return fetch('http://agile-cove-43620.herokuapp.com/api/tasks')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              dataSource: responseJson,
            }, function(){
                
                var items = this.state.dataSource;
                
                for (var i = 0; i < items.length; i++){
                    
                    if (items[i].list == 1){
                        this.state.TodoList.push(items[i]);
                    }else if (items[i].list == 2) {
                        this.state.DoingList.push(items[i]);
                    }else {
                        this.state.DoneList.push(items[i]);
                    }
                }
                this.setState({
                    isLoading: false,
                     
                });
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
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
            <Button transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
                <Tabs>

                    <Tab heading={<TabHeading>
                        <Text>Todo</Text>
                        <Badge>
                            <Text>{this.state.TodoList.length}</Text>
                        </Badge>
                    </TabHeading>}>
                    <List dataArray={this.state.TodoList}
                    renderRow={(item) =>
                        <ListItem icon>
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
                        <Badge warning>
                        <Text>{this.state.DoingList.length}</Text>
                        </Badge>
                    </TabHeading>}>
                    <List dataArray={this.state.DoingList}
                    renderRow={(item) =>
                        <ListItem icon>
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
                        <Badge success>
                            <Text>{this.state.DoneList.length}</Text>
                        </Badge>
                    </TabHeading>}>
                    <List dataArray={this.state.DoneList}
                    renderRow={(item) =>
                        <ListItem icon>
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
            </Container>
            </StyleProvider>
        );
    }
}