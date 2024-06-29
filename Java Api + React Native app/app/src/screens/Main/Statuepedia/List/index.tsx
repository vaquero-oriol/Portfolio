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
import { StatuepediaStackScreenProps } from '../../../../utils/navigator.types';

const StatuepediaScreen = ({
  navigation,
}: StatuepediaStackScreenProps<'StatueList'>) => {
  const { colors } = useColors();
  const [text, onChangeText] = React.useState('Search for statue...');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Statuepedia"
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
        style={styles.viewStatue}
        onPress={() => navigation.navigate('StatueInfo')}>
        <Image
          source={require('../../../../assets/images/GatoDeBotero.png')}
          style={styles.statueImage}
        />
        <View style={styles.viewTextStatue}>
          <Text style={styles.textStatue}>El Gato De Botero</Text>
          <View style={styles.viewObtained}>
            <Text style={styles.textObteined}>Obtained:</Text>
            <Text style={styles.textStatue}>06/06/2021</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View />
    </View>
  );
};
export default StatuepediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  viewInput: {
    margin: 50,
    flexDirection: 'row',
    backgroundColor: '#EBE1D4',
    height: 80,
    borderRadius: 10,
    elevation: 5,
  },
  viewStatue: {
    flexDirection: 'row',
    backgroundColor: '#EBE1D4',
    height: 120,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  input: {
    color: '#765A0B',
    backgroundColor: '#FFF8F2',
    width: 240,
    placeholder: 'Search...',
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
  statueImage: {
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
  textObteined: {
    color: '#765A0B',
    fontSize: 18,
  },
  viewObtained: {
    flexDirection: 'row',
  },
});
