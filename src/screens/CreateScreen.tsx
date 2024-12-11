import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { todoRepository } from '../repositories/TodoRepository';

export default function CreateScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const theme = useTheme();

    const handleSave = async () => {
        try {
            await todoRepository.create({
                title: title.trim(),
                description: description.trim()
            });
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save todo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Create TODO" />
            </Appbar.Header>

            <View style={styles.content}>
                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon={({ size, color }) => (
                        <MaterialIcons name="title" size={size} color={color} />
                    )} />}
                />

                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    left={<TextInput.Icon icon={({ size, color }) => (
                        <MaterialIcons name="description" size={size} color={color} />
                    )} />}
                />

                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.button}
                    disabled={!title.trim()}
                    icon={({ size, color }) => (
                        <MaterialIcons name="save" size={size} color={color} />
                    )}
                >
                    Save TODO
                </Button>
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
    input: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    button: {
        marginTop: 8,
    },
}); 