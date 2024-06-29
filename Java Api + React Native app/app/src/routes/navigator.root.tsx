import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login/index';
import RecoverPasswordScreen from '../screens/Auth/RecoverPassword/index';
import SendEmailScreen from '../screens/Auth/SendEmail/index';
import SignUp from '../screens/Auth/SignUp/index';
import ChatScreen from '../screens/Main/Friends/Chat/index';
import HomeScreen from '../screens/Main/Home/index';
import ScanScreen from '../screens/Main/Scan/index';
import MainNavigator from './route.main';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Main" component={MainNavigator} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen}
      />
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="SendEmail" component={SendEmailScreen} />
      <RootStack.Screen name="Scanner" component={ScanScreen} />
      <RootStack.Screen name="Chat" component={ChatScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
