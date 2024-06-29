import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoScreen from '../screens/Main/Statuepedia/Info';
import StatuepediaScreen from '../screens/Main/Statuepedia/List';
import { StatuepediaStackParamList } from '../utils/navigator.types';

const StatuepediaStack =
  createNativeStackNavigator<StatuepediaStackParamList>();

const StatuepediaNavigator = () => {
  return (
    <StatuepediaStack.Navigator
      initialRouteName="StatueList"
      screenOptions={{ headerShown: false }}>
      <StatuepediaStack.Screen
        name="StatueList"
        component={StatuepediaScreen}
      />
      <StatuepediaStack.Screen name="StatueInfo" component={InfoScreen} />
    </StatuepediaStack.Navigator>
  );
};

export default StatuepediaNavigator;
