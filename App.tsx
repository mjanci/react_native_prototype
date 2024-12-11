import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AppNavigator, RootStackParamList } from './src/navigation/AppNavigator';
import { NativeModules } from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    disabled: '#f2f2f2',
    placeholder: '#a1a1a1',
  },
};

type ValidRoute = keyof RootStackParamList;

function App(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<ValidRoute>('List');

  useEffect(() => {
    const getInitialRoute = async () => {
      try {
        const screen = await NativeModules.NativeNavigationModule.getInitialScreen();
        if (screen && isValidRoute(screen)) {
          setInitialRoute(screen);
        }
      } catch (error) {
        console.error('Failed to get initial screen:', error);
      }
    };
    getInitialRoute();
  }, []);

  const isValidRoute = (route: string): route is ValidRoute => {
    return ['List', 'Create', 'Detail'].includes(route);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator initialRoute={initialRoute} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;