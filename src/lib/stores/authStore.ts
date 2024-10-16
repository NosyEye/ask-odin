import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, removeStorageItem } from '$lib/stores/storage';

import type { TwitchUser } from '$lib/types/twitchuser';

// Token
const accessTokenStorageName = 'accessTokenStore';

const storedValue = getStorageItem(accessTokenStorageName);
let actualValue = '';
if (storedValue) {
    actualValue = storedValue;
}



export const accessTokenStore = writable<string>(actualValue);

accessTokenStore.subscribe((token) => {
    setStorageItem(accessTokenStorageName, token);
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

// Login status

export const loggedInStore = writable(false);
