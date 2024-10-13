import { accessTokenStore } from '$lib/stores/authStore';
import { requestTwitchAuth } from '$lib/auth';
import { get } from 'svelte/store';
import { CLIENT_ID } from '$lib/auth';

export async function fetchWithAuth(url: string): any {
    const token = get(accessTokenStore);
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Client-Id', CLIENT_ID);
    const options = {
        headers: headers
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            // Assume expired token
            const reauthenticateEvent = new CustomEvent('reauthenticate');
            window.document.dispatchEvent(reauthenticateEvent);
        }

        return response;

    } catch (error) {
        console.error(error.message);
    }
}
