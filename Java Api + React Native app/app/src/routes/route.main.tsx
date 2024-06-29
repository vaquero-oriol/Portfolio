import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import { StatuepediaNavigator } from '.';
import HomeScreen from '../screens/Main/Home';
import MapScreen from '../screens/Main/Map';
import ScanScreen from '../screens/Main/Scan';
import { MainTabParamList } from '../utils/navigator.types';
import FriendsNavigator from './route.friends';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          shifting
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.title;
            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Icon name="qrcode-scan" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsNavigator}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statuepedia"
        component={StatuepediaNavigator}
        options={{
          tabBarLabel: 'Statuepedia',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookshelf" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
