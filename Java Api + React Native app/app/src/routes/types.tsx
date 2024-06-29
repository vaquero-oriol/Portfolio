import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamsList>;
  Home: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  SendEmail: undefined;
  Scanner: undefined;
  Chat: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabParamsList = {
  Home: undefined;
  Map: undefined;
  Scan: undefined;
  Chat: undefined;
  Profile: undefined;
  Login: undefined;
  SendEmail: undefined;
  Scanner: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamsList> =
  BottomTabScreenProps<MainTabParamsList, T>;
