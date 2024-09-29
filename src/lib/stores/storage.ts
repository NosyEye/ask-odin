import { browser } from '$app/environment';

export function getStorageItem(name: string): string {
    if (browser) {
        return localStorage.getItem(name);
    }
    return '';
}

export function setStorageItem(name: string, value: any): void {
    if (browser) {
        localStorage.setItem(name, value);
    }
}

