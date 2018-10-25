import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import EndScreen from '../screens/EndScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Quiz: QuizScreen,
  End: EndScreen
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default HomeStack;
