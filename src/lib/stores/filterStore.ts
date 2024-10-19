import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem } from '$lib/stores/storage';
import { browser } from '$app/environment';
import { Filter } from '$lib/types/filter';

const filterStorageName = 'filterStore';

const storedValue = getStorageItem(filterStorageName);
let actualValue = new Filter();
try {
    if (browser) {
        const parsedValue = JSON.parse(storedValue);
        if (parsedValue) {
            actualValue = new Filter(parsedValue);
        }
    }
}
catch (error) {
    console.error(error);
}

export const filterStore = writable<Filter>(actualValue);

filterStore.subscribe((filter) => {
    setStorageItem(filterStorageName, JSON.stringify(filter));
});

export const showFiltersStore = writable(false);
