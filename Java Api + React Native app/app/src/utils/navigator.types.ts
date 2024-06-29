import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  SendEmail: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Scan: undefined;
  Friends: undefined;
  Statuepedia: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileConfiguration: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type StatuepediaStackParamList = {
  StatueList: undefined;
  StatueInfo: undefined;
};

export type StatuepediaStackScreenProps<
  T extends keyof StatuepediaStackParamList,
> = NativeStackScreenProps<StatuepediaStackParamList, T>;

export type FriendsStackParamList = {
  FriendsList: undefined;
  FriendInfo: undefined;
  Chat: undefined;
};

export type FriendsStackScreenProps<T extends keyof FriendsStackParamList> =
  NativeStackScreenProps<FriendsStackParamList, T>;
