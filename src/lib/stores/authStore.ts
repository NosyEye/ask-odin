import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

import type { TwitchUser } from '$lib/types/twitchuser';

// Token
const authTokenStorageName = 'authTokenStore';

const storedValue = getStorageItem(authTokenStorageName);
let actualValue = '';
if (storedValue) {
    actualValue = storedValue;
}



export const authTokenStore = writable<string>(actualValue);

authTokenStore.subscribe((channels) => {
    setStorageItem(authTokenStorageName, JSON.stringify(channels));
});

// User

export const userStore = writable<TwitchUser>();

// const userStorageName = 'userStore';
//
// const storedValue = getStorageItem(userStorageName);
// let actualValue = [];
// try {
//     const parsedValue = JSON.parse(storedValue);
//     if (parsedValue) {
//         actualValue = parsedValue;
//     }
// }
// catch (error) {
//     console.error(error);
// }

// export const userStore = writable<TwitchUser>(actualValue);

// userStore.subscribe((channels) => {
//     setStorageItem(userStorageName, JSON.stringify(channels));
// });
