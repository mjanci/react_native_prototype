import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native';
import { Appbar, Card, FAB, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Todo } from '../models/Todo';
import { todoRepository } from '../repositories/TodoRepository';
import { NativeNavigation } from '../modules/NativeNavigation';

export default function ListScreen() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const theme = useTheme();

    const loadTodos = async () => {
        setLoading(true);
        try {
            const data = await todoRepository.getAll();
            setTodos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTodos();
        setRefreshing(false);
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const renderItem = ({ item }: { item: Todo }) => (
        <Card
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
        >
            <Card.Title
                title={item.title}
                subtitle={new Date(item.createdAt).toLocaleDateString()}
                left={(props) => <MaterialIcons name="assignment" size={24} color={theme.colors.primary} />}
            />
            <Card.Content>
                <Text style={styles.description}>{item.description}</Text>
            </Card.Content>
        </Card>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="My TODOs" />
                <Appbar.Action
                    icon="android"
                    onPress={() => NativeNavigation.openNativeScreen()}
                />
            </Appbar.Header>

            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.colors.primary]}
                    />
                }
            />

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('Create')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 2,
    },
    description: {
        marginTop: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 