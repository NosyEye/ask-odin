import { writable } from 'svelte/store';
import { access_token, current_user, CLIENT_ID } from '$lib/auth';
import { get } from 'svelte/store';
import type { LiveStream } from '$lib/types/livestream';

// async function getUserId() {
//     const token = get(access_token);
//     const headers = new Headers();
//     headers.set('Authorization', `Bearer ${token}`);
//     headers.set('Client-Id', CLIENT_ID);
//     const options = {
//         headers: headers
//     };
//
//     const response = await fetch('https://api.twitch.tv/helix/users', options);
//     const responseObject = await response.json();
//
//     if (responseObject.data && responseObject.data.length > 0) {
//         return responseObject.data[0].id;
//     }
// }

// export const live_streams = writable<LiveStream[]>();


export const streams_store = writable<LiveStream[]>([]);

async function getFollowedStreams() {
    const token = get(access_token);
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Client-Id', CLIENT_ID);
    const options = {
        headers: headers
    };

    const user = get(current_user);

    const response = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`, options);
    const responseObject = await response.json();
    return responseObject.data;
}


function durationToString(durationMs: number) {
    const totalSeconds = Math.floor(durationMs / 1000);
    const totalMinutes = Math.ceil(Math.floor(totalSeconds / 60) / 5) * 5;


    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;

    const minutesString = (minutes > 9 ? minutes.toString() : '0' + minutes.toString());

    return hours.toString() + ':' + minutesString;
}

export async function getStreams(category: string, maxDurationMinutes: number, minViewers: number, maxViewers: number, minutesToRaid: number) {
    const liveFollowedStreams = await getFollowedStreams();

    let liveStreams: LiveStream[] = [];

    const maxDurationMs = maxDurationMinutes * 60 * 1000;
    const now = new Date();

    for (let stream of liveFollowedStreams) {
        if (stream.game_name !== category) {
            continue;
        }

        const streamStartTime = new Date(stream.started_at);
        const duration = now - streamStartTime + minutesToRaid * 60 * 1000;
        if (duration > maxDurationMs) {
            continue;
        }

        if (stream.viewer_count > maxViewers || stream.viewer_count < minViewers) {
            continue;
        }

        liveStreams.push({
           name: stream.user_name,
           runningTime: durationToString(duration),
           viewers: stream.viewer_count,
           title: stream.title,
           link: `https://twitch.tv/${stream.user_login}`,
           selected: false
        });
    }

    streams_store.set(liveStreams);
}

function toDiscordFormat() {
    let discordText = '```\n';
    const streams = get(streams_store);
    const selectedStreams = streams.filter(s => s.selected);
    for (const [index,stream] of selectedStreams.entries()) {
        discordText += stream.name.padEnd(25, ' ') + stream.runningTime + ' (' + stream.viewers + ')';

        if (index < selectedStreams.length - 1) {
            discordText += '\n\n';
        }
    }

    discordText += '\n```'

    return discordText;
}

export function copySelectedStreamsForDiscord() {
    const textToCopy = toDiscordFormat();
    navigator.clipboard.writeText(textToCopy);
}
