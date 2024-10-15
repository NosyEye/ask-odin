import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import type { TwitchUser } from '$lib/types/twitchuser';

import { dev } from '$app/environment';

import { userStore, accessTokenStore, loggedInStore } from '$lib/stores/authStore';

import { fetchWithAuth } from '$lib/http';

// Twitch app client id
export const CLIENT_ID = 'v8wujfpreu728as1ms9nixfmxmyp2j';

const state = 'asla3w4oawn38d4yw8l3rw';

export function requestTwitchAuth() {
    const baseUrl = 'https://id.twitch.tv/oauth2/authorize';
    let redirectUrl = '';
    if (dev) {
        redirectUrl = 'http://localhost:5173/';
    }
    else {
        redirectUrl = 'https://nosyeye.github.io/ask-odin/';
    }

    const responseType = 'token';
    const scope = 'user:read:follows';

    const authUrl = `${baseUrl}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location = authUrl;
}

export function processTwitchAuth() {
    const locationHash = window.location.hash;
    if (locationHash) {
        const token = extractToken(locationHash);

        accessTokenStore.set(token);

        if (dev) {
            goto('/');
        }
        else {
            goto('/ask-odin/');
        }

        getUser();
    } else {
        const token = get(accessTokenStore);

        if (token !== '') {
            getUser();
        }
    }
}

function extractToken(hash) {
    const rx = /\access_token=(.*)&scope/g;
    const arr = rx.exec(hash);

    return arr[1];
}

export function logout() {
   loggedInStore.set(false);
   accessTokenStore.set('');
}

async function getUser() {
    const response = await fetchWithAuth('https://api.twitch.tv/helix/users');
    if (!response.ok) {
        return;
    }
    const responseObject = await response.json();

    if (responseObject.data && responseObject.data.length > 0) {
        const user: TwitchUser = {
            id: responseObject.data[0].id,
            display_name: responseObject.data[0].display_name
        };
        userStore.set(user);
        loggedInStore.set(true);
    }
}

