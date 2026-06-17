import { useState, useEffect, useCallback, useRef } from 'react';

type Mode = 'focus' | 'break';

export function usePomodoro() {
    const [mode, setMode] = useState<Mode>('focus');
    const [focusDuration, setFocusDuration] = useState(25 * 60);
    const [breakDuration, setBreakDuration] = useState(5 * 60);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const toggleTimer = useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? focusDuration : breakDuration);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [mode, focusDuration, breakDuration]);

    const switchMode = useCallback((newMode: Mode) => {
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(newMode === 'focus' ? focusDuration : breakDuration);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [focusDuration, breakDuration]);

    const setTimeVariant = useCallback((minutes: number, type: Mode) => {
        const seconds = minutes * 60;
        if (type === 'focus') {
            setFocusDuration(seconds);
            if (mode === 'focus') {
                setTimeLeft(seconds);
                setIsActive(false);
            }
        } else {
            setBreakDuration(seconds);
            if (mode === 'break') {
                setTimeLeft(seconds);
                setIsActive(false);
            }
        }
    }, [mode]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (mode === 'focus') {
                try {
                    const currentCount = parseInt(localStorage.getItem('focus-count') || '0', 10);
                    localStorage.setItem('focus-count', String(currentCount + 1));
                } catch (e) { }
            }
            try {
                const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
                audio.play().catch(() => { });
            } catch (e) { }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    return {
        mode,
        timeLeft,
        isActive,
        toggleTimer,
        resetTimer,
        switchMode,
        setTimeVariant,
        focusDuration,
        breakDuration
    };
}
