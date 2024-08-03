// src/stores.ts
import { writable } from 'svelte/store';

// Helper function to get value from localStorage
function getLocalStorageItem(key: string, defaultValue: any) {
	if (typeof localStorage !== 'undefined') {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : defaultValue;
	}
	return defaultValue;
}

// Create writable stores
export const lastSunday = writable<string>(getLocalStorageItem('lastSunday', ''));
export const plan = writable<string>(getLocalStorageItem('plan', ''));
export const used = writable<number>(getLocalStorageItem('used', 0));

// Subscribe to stores and save to localStorage on update
lastSunday.subscribe(value => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('lastSunday', JSON.stringify(value));
	}
});

plan.subscribe(value => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('plan', JSON.stringify(value));
	}
});

used.subscribe(value => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('used', JSON.stringify(value));
	}
});