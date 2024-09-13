import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

interface TwitchUser {
    id: string;
    display_name: string;
}

export const access_token = writable('');
export const logged_in = writable(false);
export const current_user = writable<TwitchUser>();

access_token.subscribe((token) => {
    if (token) {
        logged_in.set(true);
    } else {
        logged_in.set(false);
    }
});

// Twitch app client id
export const CLIENT_ID = 'v8wujfpreu728as1ms9nixfmxmyp2j';

const state = 'asla3w4oawn38d4yw8l3rw';

export function requestTwitchAuth() {
    const baseUrl = 'https://id.twitch.tv/oauth2/authorize';
    // const redirectUrl = 'http://localhost:5173/';
    const redirectUrl = 'https://nosyeye.github.io/ask-odin/';
    const responseType = 'token';
    const scope = 'user:read:follows';

    const authUrl = `${baseUrl}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location = authUrl;
}

export function processTwitchAuth() {
    const locationHash = window.location.hash;
    if (locationHash) {
        const token = extractToken(locationHash);
        access_token.set(token);
        // goto('/');
        goto('/ask-odin/');

        getUser();
    }
}

function extractToken(hash) {
    const rx = /\access_token=(.*)&scope/g;
    const arr = rx.exec(hash);

    return arr[1];
}

export function logout() {
   access_token.set('');
}

async function getUser() {
    const token = get(access_token);
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Client-Id', CLIENT_ID);
    const options = {
        headers: headers
    };

    const response = await fetch('https://api.twitch.tv/helix/users', options);
    const responseObject = await response.json();

    if (responseObject.data && responseObject.data.length > 0) {
        const user: TwitchUser = {
            id: responseObject.data[0].id,
            display_name: responseObject.data[0].display_name
        };
        current_user.set(user);
    }
}

