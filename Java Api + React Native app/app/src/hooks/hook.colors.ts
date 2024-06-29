import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from '../utils/theme';

const useColors = () => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    return darkTheme; //TODO Change to dark theme when implemented
  }
  return lightTheme;
};

export default useColors;
