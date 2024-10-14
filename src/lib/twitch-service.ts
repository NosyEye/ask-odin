import { writable } from 'svelte/store';
import { CLIENT_ID } from '$lib/auth';
import { get } from 'svelte/store';
import type { LiveStream } from '$lib/types/livestream';

import { channelsStore, channelsTimestampStore } from '$lib/stores/channelsStore';
import type { Filter } from '$lib/types/filter';
import { filterStore } from '$lib/stores/filterStore';
import { userStore, accessTokenStore } from '$lib/stores/authStore';

import { fetchWithAuth } from '$lib/http';

async function getFollowedStreams() {
    const user = get(userStore);

    const response = await fetchWithAuth(`https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`);

    if (!response.ok) {
        return [];
    }

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

// export async function getStreams(category: string, maxDurationMinutes: number, minViewers: number, maxViewers: number, minutesToRaid: number) {
export async function getStreams(category: string) {
    const liveFollowedStreams = await getFollowedStreams();
    const now = new Date();
    channelsTimestampStore.set(now);

    const filteredFollowedStreams = filterStreams(liveFollowedStreams, get(filterStore));

    channelsStore.set(filteredFollowedStreams);
}

export function filterStreams(streams: any[], filter: any): LiveStream[] {
    const maxDurationMs = filter.maxMinutesStreamed * 60 * 1000;

    let filteredStreams: LiveStream[] = [];

    const now = new Date();
    for (const stream of streams) {
        if (stream.game_name !== filter.category) {
            continue;
        }

        const streamStartTime = new Date(stream.started_at);
        const durationMs = now - streamStartTime + filter.minutesToRaid * 60 * 1000;
        if (durationMs > maxDurationMs) {
            continue;
        }

        if (stream.viewer_count > filter.maxViewers || stream.viewer_count < filter.minViewers) {
            continue;
        }

        filteredStreams.push({
            name: stream.user_name,
            runningTime: durationToString(durationMs),
                         viewers: stream.viewer_count,
                         title: stream.title,
                         link: `https://twitch.tv/${stream.user_login}`,
                         selected: false
        });
    }

    return filteredStreams;
}

function toDiscordFormat() {
    let discordText = '```\n';
    const streams = get(channelsStore);
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
