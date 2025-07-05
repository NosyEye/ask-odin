import { get } from 'svelte/store';
import type { LiveStream } from '$lib/types/livestream';

import { streamsStore, streamsTimestampStore } from '$lib/stores/streamsStore';
import type { Filter } from '$lib/types/filter';
import { filterStore } from '$lib/stores/filterStore';
import { userStore } from '$lib/stores/authStore';

import { fetchWithAuth } from '$lib/http';

async function getLiveFollowedStreams(): any[] {
    const user = get(userStore);

    if (!user) {
        return [];
    }

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

let locked = Promise.resolve(null);

export async function getStreams() {
    locked.then(async function() {
        const liveFollowedStreams = await getLiveFollowedStreams();
        const now = new Date();
        streamsTimestampStore.set(now);

        const currentStreams = get(streamsStore);

        let updatedStreams = [];
        for (const stream of liveFollowedStreams) {
            const currentStream = currentStreams.find(s => s.name === stream.user_name);

            const streamStartTime = new Date(stream.started_at);
            const durationMs = now - streamStartTime;

            updatedStreams.push({
                name: stream.user_name,
                category: stream.game_name,
                adjustedRunningTimeString: durationToString(durationMs),
                runningTime: durationMs,
                adjustedRunningTime: durationMs,
                viewers: stream.viewer_count,
                title: stream.title,
                link: `https://twitch.tv/${stream.user_login}`,
                selected: currentStream ? currentStream.selected : false,
                deleted: currentStream ? currentStream.deleted : false,
                filteredOut: currentStream ? currentStream.filteredOut : false,
                offline: false,
                note: currentStream ? currentStream.note : ''
            });
        }

        for (let stream of currentStreams) {
            if (stream.offline) {
                continue;
            }

            const inUpdated = updatedStreams.find(s => s.name === stream.name);

            if (!inUpdated) {
                stream.offline = true;
                stream.selected = false;
                updatedStreams.push(stream);
            }
        }
        updatedStreams.sort(sortByViewersDesc);

        filterStreams(updatedStreams, get(filterStore));
        streamsStore.set(updatedStreams);
    });
}

function sortByViewersDesc(a, b) {
    return a.viewers < b.viewers;
}

export async function getStreamsAndReset() {
    locked.then(async function() {

        const liveFollowedStreams = await getLiveFollowedStreams();
        const now = new Date();
        streamsTimestampStore.set(now);

        const streams = [];
        for (const stream of liveFollowedStreams) {
            const streamStartTime = new Date(stream.started_at);
            const durationMs = now - streamStartTime;

            streams.push({
                name: stream.user_name,
                category: stream.game_name,
                adjustedRunningTimeString: durationToString(durationMs),
                runningTime: durationMs,
                adjustedRunningTime: durationMs,
                viewers: stream.viewer_count,
                title: stream.title,
                link: `https://twitch.tv/${stream.user_login}`,
                selected: false,
                deleted: false,
                filteredOut: false,
                offline: false,
                note: ''
            });
        }
        filterStreams(streams, get(filterStore));
        streamsStore.set(streams);
    });
}

export function filterStreams(streams: any[], filter: Filter) {
    const maxDurationMs = filter.maxMinutesStreamed * 60 * 1000;

    const now = new Date();
    for (const stream of streams) {
        stream.adjustedRunningTime = stream.runningTime + filter.minutesToRaid * 60 * 1000;
        stream.adjustedRunningTimeString = durationToString(stream.adjustedRunningTime);

        if (filter.category && filter.category !== '' && !stream.category.toLowerCase().includes(filter.category.toLowerCase())) {
            stream.filteredOut = true;
            continue;
        }

        if (filter.maxMinutesStreamed !== 300 && stream.adjustedRunningTime > maxDurationMs) {
            stream.filteredOut = true;
            continue;
        }

        if ((filter.maxViewers !== 3000 && stream.viewers > filter.maxViewers) || stream.viewers < filter.minViewers) {
            stream.filteredOut = true;
            continue;
        }

        stream.filteredOut = false;
    }
}

filterStore.subscribe((filter) => {
    locked.then(function() {
        let streams = get(streamsStore);
        filterStreams(streams, filter);
        streamsStore.set(streams);
    });
});

function toDiscordFormat() {
    let discordText = '```\n';
    const streams = get(streamsStore);
    const selectedStreams = streams.filter(s => s.selected && !s.deleted && !s.filteredOut);

    let mostViewers = 0;
    for (const stream of selectedStreams) {
        if (stream.viewers > mostViewers) {
            mostViewers = stream.viewers;
        }
    }
    let mostViewerDigits = mostViewers.toString().length;

    for (const [index,stream] of selectedStreams.entries()) {
        let viewCount = ' (' + stream.viewers + ')';
        discordText += stream.name.padEnd(25, ' ') + stream.adjustedRunningTimeString + viewCount.padEnd(mostViewerDigits + 3, ' ') + (stream.note ? `  ${stream.note}` : '');

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
