import React from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { Body, Card, CardItem, Text } from 'native-base';

const radioValues = [
  { label: 'True   ', value: 'True' },
  { label: 'False', value: 'False' }
];

export default class Question extends React.Component {

  render() {
    const { setAnswer, question } = this.props;
    // clean &quot and &#39
    let q = question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>
               {q}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <RadioForm
              radio_props={ radioValues }
              initial={-1}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#000'}
              animation={true}
              borderWidth={1}
              selectedButtonColor={'#444'}
              buttonSize={15}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{ marginRight: 5 }}
              onPress={(value) => {
                setAnswer(this.props.index, value);
              }}
            />
          </Body>
        </CardItem>
      </Card>
    );
  }
}
