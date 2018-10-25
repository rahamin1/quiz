import React from 'react';
import { SafeAreaView  } from 'react-native';
import {
  Container, Button, Content, Text, Picker, Form, Thumbnail,
  Header, Left, Right, Body, Title, Card, CardItem
} from "native-base";

import { icon } from '../constants/misc';

import styles from './styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    difficulty: 'easy',
    category: 0
  }

// &difficulty=easy
  render() {
    const { difficulty, category } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={styles.container}>
          <Header>
            <Left />
            <Body>
              <Title>Start the Quiz!</Title>
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
                      Select the quiz parameters and click the button to start!
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Form style={{ marginTop: 40 }}>
              <Text style={styles.selectText}>
                Select Difficulty Level:
              </Text>
              <Picker
                note
                mode="dropdown"
                style={{ width: 300, color: '#000' }}
                selectedValue={this.state.difficulty}
                onValueChange={this.difficultyChange.bind(this)}>
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
              </Picker>

              <Text style={styles.selectText}>
                Select Category:
              </Text>
              <Picker
                note
                mode="dropdown"
                style={{ width: 300, color: '#000' }}
                selectedValue={this.state.category}
                onValueChange={this.categoryChange.bind(this)}>
                <Picker.Item label="Any Category" value="0" />
                <Picker.Item label="Computers" value="18" />
                <Picker.Item label="Television" value="14" />
                <Picker.Item label="Geography" value="22" />
              </Picker>
            </Form>
            <Button block style={{ marginTop: 50 }}
              onPress={() => this.props.navigation.navigate('Quiz', { difficulty, category })}>
              <Text style={styles.helpText}>
                Click here to start!
              </Text>
            </Button>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }

  difficultyChange(value: string) {
    this.setState({
      difficulty: value
    });
  }

  categoryChange(value: string) {
    this.setState({
      category: value
    });
  }
}
