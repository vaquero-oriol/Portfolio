import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../../components/ui';
import useColors from '../../../hooks/hook.colors';
import { MainTabScreenProps } from '../../../routes/types';

const MapScreen = ({ navigation }: MainTabScreenProps<'Map'>) => {
  const { colors } = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Map"
        center
        onPressRightIcon={() => navigation.navigate('Profile')}
      />
      <View style={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <Image
            source={require('../../../assets/images/test_map.png')}
            contentFit="contain"
            style={styles.map}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flex: 1, justifyContent: 'center' },
  mapContainer: { marginHorizontal: 40 },
  map: { width: '100%', height: '100%' },
});

export default MapScreen;
