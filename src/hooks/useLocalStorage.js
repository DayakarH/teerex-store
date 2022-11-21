import React, { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        const valueToStore =
            value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;