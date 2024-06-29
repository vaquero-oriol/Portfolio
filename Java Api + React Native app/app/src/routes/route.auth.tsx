import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import RecoverPasswordScreen from '../screens/Auth/RecoverPassword';
import SendEmailScreen from '../screens/Auth/SendEmail';
import SignUpScreen from '../screens/Auth/SignUp';
import { AuthStackParamList } from '../utils/navigator.types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen}
      />
      <AuthStack.Screen name="SendEmail" component={SendEmailScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
