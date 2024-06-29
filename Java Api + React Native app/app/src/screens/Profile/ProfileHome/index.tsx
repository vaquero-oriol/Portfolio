import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profile } from '../../../models/Profile';
import { ProfileService } from '../../../services/ProfileService';
import { ProfileStackScreenProps } from '../../../utils/navigator.types';

const ProfileScreen = ({ navigation }: ProfileStackScreenProps<'Profile'>) => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(new Profile());

  async function checkData() {
    const response = await ProfileService();
    console.log(response);

    const newProfile = new Profile(
      response.name,
      response.email,
      response.image,
      response.theme,
    );

    // Establecer el estado de statue con la nueva instancia
    setProfile(newProfile);
  }

  useEffect(() => {
    setShowModal(false);
    checkData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.viewConfig}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            <Image
              source={require('../../../assets/images/engranaje.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewFoto}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/fotoPerfil.png')}
          />
        </View>
        <View style={styles.viewText}>
          <Text style={styles.text2}>{profile.name}</Text>
          <Text style={styles.text2}>{profile.email}</Text>
          <View style={styles.viewRow}>
            <Text style={styles.text2}>Started playing:</Text>
            <Text style={styles.textS}>16/02/2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.otherViewsSmall}>
        <View>
          <View style={styles.viewRow2}>
            <Text style={styles.text}>Statues finded:</Text>
            <Text style={styles.textM}>0</Text>
          </View>
          <Text style={styles.text}>Total Progress Statues:</Text>
          <Progress.Bar style={styles.progressBar} />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Text style={styles.buttonText2}>Statuepedia</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  viewFoto: {
    alignItems: 'center',
    height: 200,
  },
  viewText: {
    marginLeft: 40,
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewRow2: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    borderRadius: 70,
    height: '70%',
    width: '45%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#000000',
  },
  view1: {
    borderRadius: 10,
    marginHorizontal: '12%',
    backgroundColor: '#FFDF9A',
    height: '55%',
    width: '80%',
    elevation: 5,
  },
  otherViewsSmall: {
    backgroundColor: '#496547',
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    width: '90%',
    height: 170,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginBottom: 10,
  },
  textM: {
    color: '#FFDF9A',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
  },
  textS: {
    color: '#496547',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 10,
  },
  text2: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 10,
  },
  progressBar: {
    height: 20,
    width: 300,
    color: '#FFBF1A',
    borderBlockColor: '#496547',
    borderColor: '#FFDF9A',
  },
  button2: {
    marginVertical: 10,
    backgroundColor: '#FFDF9A',
    width: 130,
    height: 30,
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  viewButton: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  textButtonView: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    marginTop: '15%',
  },

  buttonText2: {
    marginHorizontal: 10,
    marginTop: 4,
    color: '#000000',
  },
  icon: {
    width: 30,
    height: 30,
  },
  touchable: {
    padding: 10,
  },
  viewConfig: {
    alignItems: 'flex-end',
  },
});

export default ProfileScreen;
