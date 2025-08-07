'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/utils';

type SetValue<T> = T | ((val: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    const item = storage.get<T>(key);
    return item !== null ? item : initialValue;
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: SetValue<T>) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        storage.set(key, valueToStore);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook for managing multiple localStorage keys
export function useMultipleLocalStorage<T extends Record<string, any>>(
  keys: (keyof T)[],
  initialValues: T
): [T, (key: keyof T, value: T[keyof T]) => void] {
  const [values, setValues] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const stored = {} as T;
    keys.forEach((key) => {
      const item = storage.get<T[keyof T]>(String(key));
      stored[key] = item !== null ? item : initialValues[key];
    });
    
    return stored;
  });

  const setValue = (key: keyof T, value: T[keyof T]) => {
    try {
      setValues(prev => ({ ...prev, [key]: value }));
      
      if (typeof window !== 'undefined') {
        storage.set(String(key), value);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${String(key)}":`, error);
    }
  };

  return [values, setValue];
}

// Hook for managing localStorage with expiration
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryInMinutes: number
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;

      const parsedItem = JSON.parse(item);
      const now = new Date();

      if (now.getTime() > parsedItem.expiry) {
        localStorage.removeItem(key);
        return initialValue;
      }

      return parsedItem.value;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        const now = new Date();
        const item = {
          value: valueToStore,
          expiry: now.getTime() + (expiryInMinutes * 60 * 1000),
        };
        localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
