import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../../models/User';
import { ProfileRepository } from '../../../services/ConfigurationService';

const ConfigurationScreen = () => {
  //const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(new User());
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Save After Press the button
  const handleSaveChanges = async () => {
    try {
      await ProfileRepository(user); // Aquí asumimos que tu función se encarga de todo el manejo de errores y respuestas
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.viewFoto}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/fotoPerfil.png')}
          />
        </View>
        <View style={styles.viewInputs}>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Surname" />
          <TextInput style={styles.input} placeholder="Email" />
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={itemValue => setSelectedValue(itemValue)}>
            <Picker.Item label="Dark" value="dark" style={styles.pickerItem} />
            <Picker.Item
              label="Light"
              value="Light"
              style={styles.pickerItem}
            />
            <Picker.Item label="Mix" value="Mix" style={styles.pickerItem} />
          </Picker>
        </View>
        {/* <View style={styles.viewSwitch}>
          <Text style={styles.text1}>Linked To Social Media</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor="#f5dd4b"
            ios_backgroundColor="#3e3e3e"
          />
        </View> */}
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.textButton}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button2} onPress={handleSaveChanges}>
          <Text style={styles.textButton}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  view1: {
    marginTop: 50,
    borderRadius: 10,
    marginHorizontal: '12%',
    backgroundColor: '#FFDF9A',
    height: '60%',
    elevation: 5,
  },
  viewInputs: {},
  viewFoto: {
    alignItems: 'center',
    height: 200,
  },
  viewSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingEnd: '20%',
  },
  text1: {
    margin: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textButton: {
    color: '#FFFFFF',
  },
  image: {
    borderRadius: 70,
    height: '70%',
    width: '45%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginHorizontal: '10%',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginHorizontal: '10%',
    borderBlockColor: '#000000',
  },

  pickerItem: {
    color: 'black',
    fontSize: 16,
  },
  viewButton: {
    margin: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  button1: {
    padding: 10,
    backgroundColor: '#496547',
    color: '#496547',
    borderRadius: 15,
  },
  button2: {
    padding: 10,
    backgroundColor: '#6B5D3F',
    color: 'white',
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default ConfigurationScreen;
