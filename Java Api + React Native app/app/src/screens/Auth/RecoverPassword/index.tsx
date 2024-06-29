import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackScreenProps } from '../../../utils/navigator.types';

type FormFields = {
  email: string;
};

function RecoverPasswordScreen({
  navigation,
}: AuthStackScreenProps<'RecoverPassword'>) {
  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: { email: '' },
  });

  const onSubmit = (values: FormFields) => {
    console.log(values);
    navigation.navigate('SendEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/react_photo.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Change password</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => {
          return (
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              underlineColorAndroid="transparent"
            />
          );
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Send email</Text>
      </TouchableOpacity>

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate('Login')}>
        Remember your password? Log In
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#FFDF9A',
    fontFamily: 'Roboto',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 290,
    height: 30,
    padding: 10,
    marginBottom: 15,
    paddingRight: 40,
    borderBottomWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 50,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFA500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
  },
  signUpText: {
    fontSize: 17,
    color: '#765A0B',
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 30,
  },
});

export default RecoverPasswordScreen;
