import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../models/Todo';
import { TodoRepository } from './TodoRepository';


export class AsyncStorageTodoRepository implements TodoRepository {
    private readonly STORAGE_KEY = '@todos';

    private async getTodos(): Promise<Todo[]> {
        const todosJson = await AsyncStorage.getItem(this.STORAGE_KEY);
        return todosJson ? JSON.parse(todosJson) : [];
    }

    private async saveTodos(todos: Todo[]): Promise<void> {
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }

    async getAll(): Promise<Todo[]> {
        return await this.getTodos();
    }

    async getById(id: string): Promise<Todo | null> {
        const todos = await this.getTodos();
        return todos.find(todo => todo.id === id) || null;
    }

    async create(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
        const todos = await this.getTodos();
        const newTodo: Todo = {
            ...todo,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };

        await this.saveTodos([...todos, newTodo]);
        return newTodo;
    }

    async update(id: string, updatedTodo: Partial<Todo>): Promise<Todo> {
        const todos = await this.getTodos();
        const index = todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            throw new Error('Todo not found');
        }

        const updated = {
            ...todos[index],
            ...updatedTodo,
        };

        todos[index] = updated;
        await this.saveTodos(todos);

        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const todos = await this.getTodos();
        const filteredTodos = todos.filter(todo => todo.id !== id);

        if (filteredTodos.length === todos.length) {
            return false;
        }

        await this.saveTodos(filteredTodos);
        return true;
    }
} 