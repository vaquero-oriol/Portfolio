import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/Main/Friends/Chat';
import FriendScreen from '../screens/Main/Friends/Friend';
import FriendsScreen from '../screens/Main/Friends/List';
import { FriendsStackParamList } from '../utils/navigator.types';

const FriendsStack = createNativeStackNavigator<FriendsStackParamList>();

const FriendsNavigator = () => {
  return (
    <FriendsStack.Navigator
      initialRouteName="FriendsList"
      screenOptions={{ headerShown: false }}>
      <FriendsStack.Screen name="FriendsList" component={FriendsScreen} />
      <FriendsStack.Screen name="FriendInfo" component={FriendScreen} />
      <FriendsStack.Screen name="Chat" component={ChatScreen} />
    </FriendsStack.Navigator>
  );
};

export default FriendsNavigator;
