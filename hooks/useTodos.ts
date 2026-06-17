import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoStatus } from '@/types';
import { useUserId } from '@/hooks/useUserId';

/**
 * Returns the localStorage key scoped to the current user's unique ID.
 * Each browser/device has its own isolated todo list.
 */
function getTodosKey(userId: string): string {
    return `aio-todos-${userId}`;
}

export function useTodos() {
    const userId = useUserId();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [mounted, setMounted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Load todos from localStorage once userId is ready
    useEffect(() => {
        if (!userId) return;

        setMounted(true);
        try {
            const stored = window.localStorage.getItem(getTodosKey(userId));
            if (stored) {
                const parsed = JSON.parse(stored);
                // Backward compatibility mapping for old 'completed' boolean tasks
                const mapped = parsed.map((t: any) => ({
                    ...t,
                    status: t.status ? t.status : (t.completed ? 'done' : 'todo')
                }));
                setTodos(mapped);
            } else {
                setTodos([]);
            }
        } catch (e) {
            console.error('Failed to parse todos', e);
        } finally {
            setLoaded(true);
        }
    }, [userId]);

    // Persist todos to localStorage whenever they change
    useEffect(() => {
        if (mounted && loaded && userId) {
            window.localStorage.setItem(getTodosKey(userId), JSON.stringify(todos));
        }
    }, [todos, mounted, loaded, userId]);

    const addTodo = useCallback((task: string) => {
        if (!task.trim()) return;

        const generateId = () => {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        };

        const newTodo: Todo = {
            id: generateId(),
            task: task.trim(),
            status: 'todo',
            createdAt: Date.now()
        };
        setTodos(prev => [newTodo, ...prev]);
    }, []);

    const updateTodoStatus = useCallback((id: string, status: TodoStatus) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, status } : todo
        ));
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    return { todos, addTodo, updateTodoStatus, deleteTodo, mounted, userId };
}
