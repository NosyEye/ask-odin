import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

import { Filter } from '$lib/types/filter';

const filterStorageName = 'filterStore';

const storedValue = getStorageItem(filterStorageName);
let actualValue = new Filter();
try {
    const parsedValue = JSON.parse(storedValue);
    if (parsedValue) {
        actualValue = parsedValue;
    }
}
catch (error) {
    console.error(error);
}

export const filterStore = writable<Filter>(actualValue);

filterStore.subscribe((filter) => {
    setStorageItem(filterStorageName, JSON.stringify(filter));
});
