import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem } from '$lib/stores/storage';

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

// Login status

export const loggedInStore = writable(false);
