const EMULATOR = false; // set true only when running on an emulator

import React from 'react';
import { Alert } from 'react-native';
import {
  Container, Body, Content, Header, Left, Right, Card, CardItem,
  Title, Button, Text,  Thumbnail
} from 'native-base';
import axios from 'axios';

import Question from './Question';
import { icon } from '../constants/misc';
import { quizQuestions } from '../constants/quiz';
import styles from './styles';

const quizUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      quizLoaded: false,

      questions: [],
      answers: [],

      startTime: 0
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  async componentDidMount() {
    await this.getQuestions.bind(this)();
  }

  async componentWillReceiveProps(nextProps) {
    // the restart parameter is passed when the user selects to play again
    // with the same parameters. In such a case, we need to reload
    // the questions and perform other initialization tasks
    if (nextProps.navigation.state.params.restart) {
      this.setState({
        isLoading: true,
        quizLoaded: false,
        questions: []
      });

      await this.getQuestions.bind(this)();
    }
  }


  async getQuestions() {

    const { category, difficulty } = this.props.navigation.state.params;

    // sample url:
    // https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=boolean
    let url = quizUrl;
    if (category && category !== '0')
      url += `&category=${category}`;

    if (difficulty && category !== '')
      url += `&difficulty=${difficulty}`;
    else
      url += `&category=easy`;

  if (!EMULATOR) {

    // production version. Doesn't work on the android genymotion emulator
    // see comment below regarding the emulator version
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      const questions = results.map((q) => {
        return {
          question: q.question, correct: q.correct_answer
        };
      });
      const startTime = new Date().getTime() / 1000;

      this.setState({
        isLoading: false,
        quizLoaded: true,
        questions,
        answers: [],
        startTime
      });
    } catch (error) {
      this.setState({ isLoading: false, quizLoaded: false });
      this.questionsLoadingFailed.bind(this)();
    }
  } else {
    // emulator version (axios.get fails on the android genymotion emulator.
    // It is a known problem:
    // https://github.com/axios/axios/issues/973)
      const results = quizQuestions.results;
      const questions = results.map((q) => {
        return {
          question: q.question, correct: q.correct_answer
        };
      });

      const startTime = new Date().getTime() / 1000;

      this.setState({
        isLoading: false,
        quizLoaded: true,
        questions,
        answers: [],
        startTime
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>The Quiz!</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Card style={styles.marginAll}>
              <CardItem bordered>
                <Left>
                  <Body>
                    <Text style={styles.textHelp}>
                      Loading Questions...
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>The Quiz!</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={styles.marginAll}>
            <CardItem bordered>
              <Left>
                <Thumbnail square large source={icon} />
                <Body>
                  <Text style={styles.helpText}>
                    Select the answer to all the questions
                    and click 'I am done' when you are... done :)
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          {this.renderQuestions()}
          <Card>
            <CardItem>
              <Body>
                <Button block
                  onPress={this.submitAnswers.bind(this)}>
                  <Text style={styles.helpText}>I am done!</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

  renderQuestions() {
    //question: q.question, correct: q.correct_answer, answer: null
    return (
      this.state.questions.map((q, index) => {
        return (
          <Question
            key={q.question}
            question={q.question} initial={-1}
            setAnswer={this.setAnswer} index={index} />
        );
      })
    );
  }

  setAnswer(index, answer) {
    const newAnswers = [...this.state.answers];
    newAnswers[index] = answer;
    this.setState({ answers: newAnswers });
  }

  submitAnswers() {

    const { questions, answers } = this.state;
    const numQuestions = questions.length;

    let gotAllAnswers = true;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] !== "True" && answers[i] !== "False") {
        gotAllAnswers = false;
        break;
      }
    }

    if (answers.length === numQuestions &&
      gotAllAnswers) {
        this.checkAnswers.bind(this)();
    } else {
      this.completeAllAnswers();
    }

    /* TODO: Need to check why answers.every... does not work
    if (answers.length === numQuestions &&
      answers.every(ans =>
        ans === "True" || ans === "False")) {
        this.checkAnswers.bind(this)();
    } else {
      this.completeAllAnswers();
    }
    */
  }

  checkAnswers() {
    const correctAnswers = this.state.answers.reduce(this.checkAnswer.bind(this), 0);

    this.showResults.bind(this)(correctAnswers);
  }

  checkAnswer(total, ans, index) {
    const correct = (ans === this.state.questions[index].correct) ? 1 : 0;
    return total + correct;
  }

  showResults(correctAnswers) {
    const elapsedTime = this.calcTime.bind(this)();
    Alert.alert(
      `Correct answers: ${correctAnswers}`,
      `Time: ${elapsedTime} seconds`,
      [
        { text: 'Play again, new parameters', onPress: () =>
        this.props.navigation.navigate('Home') },
        { text: 'Play again, same parameters', onPress: () =>
         this.props.navigation.navigate('Quiz', { restart: true }) },
        { text: 'No time... I will play later', onPress: () =>
          this.props.navigation.navigate('End'), style: 'cancel' }
      ],
      { cancelable: true }
    );
  }

  calcTime() {
    const endTime = new Date().getTime() / 1000;
    return Math.round(endTime - this.state.startTime);
  }

  completeAllAnswers() {
    Alert.alert(
      '',
      'Oops... You didn\'t answer all questions, did you? :)',
      [
        { text: 'OK', onPress: () => {} }
      ],
      { cancelable: true }
    );
  }

  questionsLoadingFailed() {
    Alert.alert(
      '',
      'Hmmm... I couldn\'t load the questions. ' +
      'Please check your internet connection and try again.',
      [
        { text: 'OK', onPress: () =>
        this.props.navigation.navigate('Home') }
      ],
      { cancelable: false }
    );
  }
}
