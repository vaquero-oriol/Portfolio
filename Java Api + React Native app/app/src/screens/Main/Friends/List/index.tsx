/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../../../components/ui';
import useColors from '../../../../hooks/hook.colors';
import { FriendsStackScreenProps } from '../../../../utils/navigator.types';

const FriendsScreen = ({
  navigation,
}: FriendsStackScreenProps<'FriendsList'>) => {
  const { colors } = useColors();
  const [text, onChangeText] = React.useState('Search for friends...');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Friends"
        center
        onPressRightIcon={() => navigation.navigate('Profile' as any)}
      />
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity style={styles.touchable}>
          <Image
            source={require('../../../../assets/images/lupa.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.viewFriend}
        onPress={() => navigation.navigate('FriendInfo')}>
        <Image
          source={require('../../../../assets/images/paloma.png')}
          style={styles.friendImage}
        />
        <View style={styles.viewTextStatue}>
          <Text style={styles.textStatue}>Paloma Jennet</Text>
          <View style={styles.viewBecame}>
            <Text style={styles.textBecame}>Became Friend: </Text>
            <Text style={styles.textStatue}>06/06/2021</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View />
    </View>
  );
};
export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    margin: 50,
    flexDirection: 'row',
    backgroundColor: '#EBE1D4',
    height: 80,
    borderRadius: 10,
    elevation: 5,
  },
  viewFriend: {
    flexDirection: 'row',
    backgroundColor: '#FFDF9A',
    height: 120,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  input: {
    color: '#765A0B',
    backgroundColor: '#FFF8F2',
    width: 240,
    padding: 5,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  touchable: {
    padding: 10,
    width: 20,
    height: 20,
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  friendImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
  },
  viewTextStatue: {
    margin: 20,
  },
  textSearch: {
    fontSize: 8,
  },
  textStatue: {
    marginBottom: 15,
    fontSize: 18,
    marginLeft: 5,
  },
  textBecame: {
    color: '#765A0B',
    fontSize: 18,
  },
  viewBecame: {
    flexDirection: 'row',
  },
});
