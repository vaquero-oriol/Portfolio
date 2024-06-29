import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthStackScreenProps } from '../../../utils/navigator.types';

function SendEmailScreen({ navigation }: AuthStackScreenProps<'SendEmail'>) {
  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="email-send"
            size={150}
            color="#FFA500"
          />
        </View>
        <Text style={styles.title}>Email was sent</Text>
        <TouchableOpacity onPress={handleLoginClick}>
          <Text style={styles.linkText}>Click here to go back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDF9A',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#FFA500',
    textAlign: 'center',
  },
});

export default SendEmailScreen;
