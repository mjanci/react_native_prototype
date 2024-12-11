// Importing dependencies
import { AsyncStorageTodoRepository } from './AsyncStorageTodoRepository';
import { Todo } from '../models/Todo';

/**
 * Interface defining the contract for a Todo repository.
 * Any repository implementing this interface should manage Todo items.
 */
export interface TodoRepository {
    getAll(): Promise<Todo[]>; // Fetch all Todos
    getById(id: string): Promise<Todo | null>; // Fetch a Todo by ID
    create(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo>; // Create a new Todo
    update(id: string, todo: Partial<Todo>): Promise<Todo>; // Update an existing Todo
    delete(id: string): Promise<boolean>; // Delete a Todo by ID
}

// Instantiate a global Todo repository using AsyncStorage
export const todoRepository = new AsyncStorageTodoRepository();
