import { writable, derived } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

import { filterStreams } from '$lib/twitch-service';
import { filterStore } from '$lib/stores/filterStore';
import type { LiveStream } from '$lib/types/livestream';

const streamsStorageName = 'streamsStore';

const storedValue = getStorageItem(streamsStorageName);
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

export const streamsStore = writable<LiveStream[]>(actualValue);

streamsStore.subscribe((streams) => {
   setStorageItem(streamsStorageName, JSON.stringify(streams));
});

// Filtered streams

export const filteredStreamsStore = derived<LiveStream[]>([streamsStore, filterStore], ([$streamsStore, $filterStore]) => filterStreams($streamsStore, $filterStore));

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
