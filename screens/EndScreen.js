import React from 'react';
import { SafeAreaView  } from 'react-native';
import {
  Container, Button, Content, Text, Thumbnail,
  Header, Left, Right, Body, Title, Card, CardItem
} from "native-base";

import { icon } from '../constants/misc';

import styles from './styles';

export default class EndScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={styles.container}>
          <Header>
            <Left />
            <Body>
              <Title>End of Game</Title>
            </Body>
            <Right />
          </Header>
          <Content padder style={styles.content}>
            <Card style={styles.marginAll}>
              <CardItem bordered>
                <Left>
                  <Thumbnail square large source={icon} />
                  <Body>
                    <Text style={styles.helpText}>
                      Thanks for playing! We hope that you enjoyed the game.
                      If you wish to play again, click the button below.
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Button block style={{ marginTop: 80 }}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.helpText}>
                Click here to play again!
              </Text>
            </Button>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
