import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

// Token
// const timestampStorageName = 'channelsTimestampStore';
//
// const storedTimestamp = getStorageItem(timestampStorageName);
//
// let actualTimestampValue = new Date();
// try {
//     const parsedValue = parseInt(storedTimestamp);
//     if (parsedValue) {
//         actualTimestampValue = new Date(parsedValue);
//     }
// }
// catch (error) {
//     console.error(error);
// }
//
// export const channelsTimestampStore = writable<Date>(actualTimestampValue);
//
// channelsTimestampStore.subscribe((timestamp: Date) => {
//     if (timestamp instanceof Date) {
//         setStorageItem(timestampStorageName, timestamp.getTime());
//     }
//     else {
//         removeStorageItem(timestampStorageName);
//     }
// });
