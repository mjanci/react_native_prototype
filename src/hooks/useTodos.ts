import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../models/Todo';
import { AsyncStorageTodoRepository } from '../repositories/AsyncStorageTodoRepository';

const todoRepository = new AsyncStorageTodoRepository();

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const fetchedTodos = await todoRepository.getAll();
            setTodos(fetchedTodos);
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
        try {
            const newTodo = await todoRepository.create(todo);
            setTodos(prev => [...prev, newTodo]);
            return newTodo;
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to create todo');
            throw e;
        }
    };

    const updateTodo = async (id: string, todo: Partial<Todo>) => {
        try {
            const updatedTodo = await todoRepository.update(id, todo);
            setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
            return updatedTodo;
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to update todo');
            throw e;
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            const success = await todoRepository.delete(id);
            if (success) {
                setTodos(prev => prev.filter(todo => todo.id !== id));
            }
            return success;
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to delete todo');
            throw e;
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        createTodo,
        updateTodo,
        deleteTodo,
        refreshTodos: fetchTodos,
    };
}; 