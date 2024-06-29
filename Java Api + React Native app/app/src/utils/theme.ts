type Theme = {
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: 'rgb(120, 90, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 223, 154)',
    onPrimaryContainer: 'rgb(37, 26, 0)',
    secondary: 'rgb(121, 89, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 223, 158)',
    onSecondaryContainer: 'rgb(38, 26, 0)',
    tertiary: 'rgb(34, 108, 46)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(167, 245, 166)',
    onTertiaryContainer: 'rgb(0, 33, 6)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(30, 27, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(30, 27, 22)',
    surfaceVariant: 'rgb(237, 225, 207)',
    onSurfaceVariant: 'rgb(77, 70, 57)',
    outline: 'rgb(127, 118, 103)',
    outlineVariant: 'rgb(208, 197, 180)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(51, 48, 42)',
    inverseOnSurface: 'rgb(247, 240, 231)',
    inversePrimary: 'rgb(248, 190, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 243, 242)',
      level2: 'rgb(244, 238, 235)',
      level3: 'rgb(240, 233, 227)',
      level4: 'rgb(239, 232, 224)',
      level5: 'rgb(236, 229, 219)',
    },
    surfaceDisabled: 'rgba(30, 27, 22, 0.12)',
    onSurfaceDisabled: 'rgba(30, 27, 22, 0.38)',
    backdrop: 'rgba(54, 48, 36, 0.4)',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: 'rgb(248, 190, 0)',
    onPrimary: 'rgb(63, 46, 0)',
    primaryContainer: 'rgb(90, 67, 0)',
    onPrimaryContainer: 'rgb(255, 223, 154)',
    secondary: 'rgb(242, 191, 72)',
    onSecondary: 'rgb(63, 46, 0)',
    secondaryContainer: 'rgb(91, 67, 0)',
    onSecondaryContainer: 'rgb(255, 223, 158)',
    tertiary: 'rgb(140, 216, 141)',
    onTertiary: 'rgb(0, 57, 15)',
    tertiaryContainer: 'rgb(0, 83, 25)',
    onTertiaryContainer: 'rgb(167, 245, 166)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(30, 27, 22)',
    onBackground: 'rgb(233, 225, 217)',
    surface: 'rgb(30, 27, 22)',
    onSurface: 'rgb(233, 225, 217)',
    surfaceVariant: 'rgb(77, 70, 57)',
    onSurfaceVariant: 'rgb(208, 197, 180)',
    outline: 'rgb(153, 144, 128)',
    outlineVariant: 'rgb(77, 70, 57)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(233, 225, 217)',
    inverseOnSurface: 'rgb(51, 48, 42)',
    inversePrimary: 'rgb(120, 90, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(41, 35, 21)',
      level2: 'rgb(47, 40, 20)',
      level3: 'rgb(54, 45, 20)',
      level4: 'rgb(56, 47, 19)',
      level5: 'rgb(61, 50, 19)',
    },
    surfaceDisabled: 'rgba(233, 225, 217, 0.12)',
    onSurfaceDisabled: 'rgba(233, 225, 217, 0.38)',
    backdrop: 'rgba(54, 48, 36, 0.4)',
  },
};
