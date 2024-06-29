import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigurationScreen from '../screens/Profile/Configuration';
import ProfileScreen from '../screens/Profile/ProfileHome';
import { ProfileStackParamList } from '../utils/navigator.types';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ProfileConfiguration"
        component={ConfigurationScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
