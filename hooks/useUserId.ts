import { useState, useEffect } from 'react';

const USER_ID_KEY = 'aio-user-id';

/**
 * Generates and persists a unique user identifier in localStorage.
 * Each browser/device gets its own ID on first visit, ensuring
 * per-user todo isolation without requiring authentication.
 */
export function useUserId(): string | null {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        try {
            let id = window.localStorage.getItem(USER_ID_KEY);
            if (!id) {
                // Generate a new unique ID for this browser/device
                id = typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now().toString(36) + Math.random().toString(36).substring(2);
                window.localStorage.setItem(USER_ID_KEY, id);
            }
            setUserId(id);
        } catch (e) {
            console.error('Failed to get/set user ID', e);
        }
    }, []);

    return userId;
}
