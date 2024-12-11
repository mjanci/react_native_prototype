import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Todo } from '../models/Todo';
import { todoRepository } from '../repositories/TodoRepository';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<DetailScreenRouteProp>();
    const [todo, setTodo] = useState<Todo | null>(null);
    const { id } = route.params;

    useEffect(() => {
        const loadTodo = async () => {
            const data = await todoRepository.getById(id);
            setTodo(data);
        };
        loadTodo();
    }, [id]);

    const handleDelete = async () => {
        try {
            await todoRepository.delete(id);
            navigation.goBack();
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    if (!todo) return null;

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="TODO Details" />
                <Appbar.Action
                    icon={({ size, color }) => (
                        <MaterialIcons name="delete" size={size} color={color} />
                    )}
                    onPress={handleDelete}
                />
            </Appbar.Header>

            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.titleContainer}>
                            <MaterialIcons name="assignment" size={24} color="#6200ee" style={styles.icon} />
                            <Text style={styles.title}>{todo.title}</Text>
                        </View>
                        <Text style={styles.description}>{todo.description}</Text>
                        <View style={styles.dateContainer}>
                            <MaterialIcons name="access-time" size={16} color="#666" style={styles.icon} />
                            <Text style={styles.date}>
                                Created: {new Date(todo.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
    },
    card: {
        elevation: 2,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 32,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 14,
        opacity: 0.7,
    },
}); 