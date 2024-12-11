import { NativeModules } from 'react-native';

const { NativeNavigationModule } = NativeModules;

export const NativeNavigation = {
    openNativeScreen: () => NativeNavigationModule.openNativeScreen(),
}; 