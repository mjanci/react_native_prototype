import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import CreateScreen from '../screens/CreateScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
    List: undefined;
    Create: undefined;
    Detail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
    initialRoute?: keyof RootStackParamList;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ initialRoute = 'List' }) => {
    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
}; 