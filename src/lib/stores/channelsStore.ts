import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

import type { LiveStream } from '$lib/types/livestream';

const channelsStorageName = 'channelsStore';

const storedValue = getStorageItem(channelsStorageName);
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
   setStorageItem(channelsStorageName, JSON.stringify(channels));
});

// Timestamp
const timestampStorageName = 'channelsTimestampStore';

const storedTimestamp = getStorageItem(timestampStorageName);

let actualTimestampValue = new Date();
try {
    const parsedValue = parseInt(storedTimestamp);
    if (parsedValue) {
        actualTimestampValue = new Date(parsedValue);
    }
}
catch (error) {
    console.error(error);
}

export const channelsTimestampStore = writable<Date>(actualTimestampValue);

channelsTimestampStore.subscribe((timestamp: Date) => {
    if (timestamp instanceof Date) {
        setStorageItem(timestampStorageName, timestamp.getTime());
    }
    else {
        removeStorageItem(timestampStorageName);
    }
});
