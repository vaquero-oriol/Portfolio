import { Image } from 'expo-image';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useColors from '../../../hooks/hook.colors';
import { AuthStackScreenProps } from '../../../utils/navigator.types';

type FormFields = {
  email: string;
  password: string;
};

const SignUpScreen = ({ navigation }: AuthStackScreenProps<'SignUp'>) => {
  const { colors } = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: FormFields) => {
    console.log(values);
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/logoS.png')}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Email"
                style={styles.textInput}
                mode="outlined"
                error={!!errors.email}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Password"
                mode="outlined"
                error={!!errors.password}
                secureTextEntry
                style={styles.textInput}
              />
            );
          }}
        />
      </View>
      <View style={styles.bottomButtonsContainer}>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={styles.bottomButton}>
          Sign Up
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          mode="text"
          style={styles.bottomButton}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: 260,
    height: 245,
    marginTop: 59,
    marginHorizontal: 76,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: '100%',
    marginTop: 48,
    gap: 21,
    marginBottom: 9,
  },
  textInput: {
    marginHorizontal: 66,
  },
  bottomButtonsContainer: {
    gap: 18,
    marginTop: 100,
    marginBottom: 103,
    width: '100%',
  },
  bottomButton: {
    marginHorizontal: 106,
  },
});

export default SignUpScreen;
