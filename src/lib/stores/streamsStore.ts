import { writable, derived } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';
import { browser } from '$app/environment';
import type { LiveStream } from '$lib/types/livestream';

const streamsStorageName = 'streamsStore';

const storedValue = getStorageItem(streamsStorageName);
let actualValue = [];
try {
    if (browser) {
        const parsedValue = JSON.parse(storedValue);
        if (parsedValue && Array.isArray(parsedValue)) {
            actualValue = parsedValue;
        }
    }
}
catch (error) {
    console.error(error);
}

export const streamsStore = writable<LiveStream[]>(actualValue);

streamsStore.subscribe((streams) => {
   setStorageItem(streamsStorageName, JSON.stringify(streams));
});

// Timestamp
const timestampStorageName = 'streamsTimestampStore';

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

export const streamsTimestampStore = writable<Date>(actualTimestampValue);

streamsTimestampStore.subscribe((timestamp: Date) => {
    if (timestamp instanceof Date) {
        setStorageItem(timestampStorageName, timestamp.getTime());
    }
    else {
        removeStorageItem(timestampStorageName);
    }
});
