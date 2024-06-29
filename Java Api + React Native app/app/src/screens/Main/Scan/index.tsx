import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<
    'granted' | 'denied' | 'undetermined' | null
  >(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status);
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <SafeAreaView>
        <Text variant="bodyLarge">Requesting for camera permission</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === 'denied') {
    return (
      <SafeAreaView>
        <Text variant="bodyLarge">No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.instructions}>Point the camera to the QR Code</Text>
      <BarCodeScanner
        style={styles.scanner}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}>
        <View style={styles.frameContainer}>
          <View style={styles.qrFrame} />
        </View>
      </BarCodeScanner>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scanner: {
    flex: 1,
    aspectRatio: 1,
    width: '80%',
    alignSelf: 'center',
  },
  frameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrImage: {
    width: 190,
    height: 190,
    opacity: 0.5, // Ajusta la opacidad según tus preferencias
  },
  qrFrame: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  instructions: {
    fontSize: 19,
    color: 'white',
    marginTop: 20,
  },
});
