import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, ProgressBar } from 'react-native-paper';
import { Header } from '../../../components/ui';
import useColors from '../../../hooks/hook.colors';
import { MainTabScreenProps } from '../../../utils/navigator.types';

const HomeScreen = ({ navigation }: MainTabScreenProps<'Home'>) => {
  const { colors } = useColors();
  const percentage = 0.54; //FOR TESTING PURPOSES
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Home"
        center
        onPressLeftIcon={() => {}}
        onPressRightIcon={() =>
          navigation.navigate('Profile', { screen: 'Profile' })
        }
      />

      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Card style={styles.progressCard}>
          <Card.Title
            title="Total Progress"
            titleVariant="titleLarge"
            subtitle={percentage * 100 + '%'}
            subtitleVariant="titleMedium"
          />
          <Card.Content>
            <ProgressBar
              progress={percentage}
              style={styles.progressBar}
              fillStyle={styles.progressBarFill}
            />
          </Card.Content>
          <Card.Actions style={styles.progressCardButton}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Statuepedia')}>
              Statuepedia
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.dailyStatueCard}>
          <Card.Cover
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Barcelona_-_Mammoth_sculpture.JPG/1280px-Barcelona_-_Mammoth_sculpture.JPG', //TEMPORAL FOR TESTING
            }}
            resizeMode="cover"
          />
          <Card.Title
            title="Daily Statue"
            titleVariant="titleLarge"
            subtitle="Hint: Ciutadella"
            subtitleVariant="titleSmall"
            style={styles.dailyStatueCardTitle}
            right={() => (
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Map')}>
                Map
              </Button>
            )}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingVertical: 20,
  },
  progressCard: {
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  progressBar: { height: 20, borderRadius: 10 },
  progressBarFill: { borderBottomRightRadius: 10, borderTopRightRadius: 10 },
  progressCardButton: { marginTop: 20 },
  dailyStatueCard: { marginTop: 20 },
  dailyStatueCardTitle: { paddingVertical: 20, paddingHorizontal: 10 },
});
export default HomeScreen;
