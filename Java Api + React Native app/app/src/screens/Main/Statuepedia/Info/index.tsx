import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatuepediaStackScreenProps } from '../../../../utils/navigator.types';
const InfoScreen = ({
  navigation,
}: StatuepediaStackScreenProps<'StatueInfo'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewFoto}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/fontElNenDelsCantirs.png')}
        />
      </View>
      <View style={styles.viewDateScan}>
        <Text style={styles.textDateWhen}>Day when was Scanned:</Text>
        <Text style={styles.textDate}>16/02/2024</Text>
      </View>
      <ScrollView style={styles.viewAbout}>
        <Text style={styles.textDateWhen}>About:</Text>
        <Text style={styles.textDate}>
          El Nen dels Cantirs es una figura folclórica arraigada en la mitología
          y tradición popular de Cataluña, especialmente en la región del Vallès
          Oriental. Su historia se entrelaza con la cultura y las leyendas
          locales, convirtiéndolo en un personaje fascinante que ha perdurado a
          lo largo de generaciones. La leyenda del Nen dels Cantirs cuenta la
          historia de un niño extraordinario que vivía en los bosques densos y
          misteriosos de la región. Se dice que este niño tenía una relación muy
          especial con la naturaleza y los animales que habitaban en ella. Desde
          temprana edad, mostró un profundo conocimiento y respeto por el
          entorno que lo rodeaba, y parecía tener la capacidad de comunicarse
          con las criaturas del bosque de una manera única y mágica. Una de las
          características más distintivas del Nen dels Cantirs es su conexión
          con los cantareros, unos recipientes de barro utilizados
          tradicionalmente para transportar agua. Se cuenta que el niño llevaba
          consigo un cantir que nunca se vaciaba, independientemente de cuánta
          agua bebiera o compartiera con otros. Este fenómeno desconcertante
          alimentó aún más las historias y creencias en torno a su naturaleza
          extraordinaria. Según la leyenda, el Nen dels Cantirs tenía la
          capacidad de curar enfermedades y aliviar dolencias mediante el poder
          del agua de su cantir. Se dice que las personas que buscaban su ayuda
          acudían al bosque con ofrendas y peticiones, y el niño, con su sonrisa
          tierna y sus ojos chispeantes, atendía a cada uno con compasión y
          sabiduría. Sin embargo, la historia del Nen dels Cantirs también está
          envuelta en misterio y tragedia. Se cuenta que un día desapareció
          misteriosamente del bosque, dejando atrás solo su cantir vacío y el
          eco de sus risas juguetonas entre los árboles. Algunos dicen que
          ascendió a los cielos para convertirse en una estrella brillante que
          vela por la protección del bosque y sus habitantes, mientras que otros
          sostienen que aún vaga por los rincones más ocultos, velando por la
          armonía y el equilibrio de la naturaleza. A lo largo de los siglos, la
          figura del Nen dels Cantirs ha perdurado en la memoria colectiva de la
          región del Vallès Oriental, inspirando cuentos, canciones y
          celebraciones populares. Su legado sigue vivo en la imaginación de
          aquellos que escuchan su historia, recordándoles la importancia de
          honrar y preservar la belleza y la magia de la naturaleza que nos
          rodea.
        </Text>
        <Text />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
  },
  viewFoto: {
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    elevation: 15,
    borderColor: '#FFDF9A',
    borderWidth: 3,
  },
  viewDateScan: {
    alignItems: 'center',
    backgroundColor: '#FFDF9A',
    width: '80%',
    height: '10%',
    borderRadius: 10,
    elevation: 5,
    padding: 15,
  },
  textDateWhen: {
    fontSize: 16,
    marginBottom: 10,
  },
  textDate: {
    fontSize: 16,
    color: '#765A0B',
  },
  viewAbout: {
    width: '80%',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFDF9A',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textAbout: {
    fontSize: 16,
    marginBottom: 10,
  },
  textDescription: {
    fontSize: 16,
    color: '#765A0B',
  },
});
export default InfoScreen;
