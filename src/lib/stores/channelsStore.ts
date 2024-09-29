import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem } from '$lib/stores/storage';

const storageName = 'channelsStore';

const storedValue = getStorageItem(storageName);
let actualValue = [];
try {
    const parsedValue = JSON.parse(storedValue);
    if (parsedValue && Array.isArray(parsedValue)) {
        actualValue = parsedValue;
    }
}
catch (error) {
    console.error(error);
}

export const channelsStore = writable<LiveStream[]>(actualValue);

channelsStore.subscribe((channels) => {
   setStorageItem(storageName, JSON.stringify(channels));
});
