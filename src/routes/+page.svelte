<script lang='ts'>
	import { getStreams } from '$lib/twitch-service';
	import { channelsStore, channelsTimestampStore } from '$lib/stores/channelsStore';

	import LiveStreamItem from './LiveStreamItem.svelte';
	import { loggedInStore } from '$lib/stores/authStore';

	let streamTextBlock  = '';

	let maxMinutes = 160;
	let minViewers = 0;
	let maxViewers = 3000;
	let minutesToRaid = 30;

	async function getRaidTargets() {
		await getStreams('Music', maxMinutes, minViewers, maxViewers, minutesToRaid);
		streamTextBlock = '';
		for (let stream of streams) {
			streamTextBlock += stream.name.padEnd(25, ' ') + stream.runningTime + ' (' + stream.viewers + ')\n';

		}
	}

	function toDiscordFormat() {
		let discordText = '```\n';
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

	function copySelectedStreamsForDiscord(){
		const textToCopy = toDiscordFormat();
		navigator.clipboard.writeText(textToCopy);
	}

	function handleSelectStream(selectEvent) {

	}

	function handleStreamDelete(deleteEvent) {
		const streamToDelete = deleteEvent.detail.name;

		const indexOfStream = $channelsStore.findIndex(s => s.name === streamToDelete);

		const toBeSpliced = $channelsStore;
		toBeSpliced.splice(indexOfStream, 1);
		$channelsStore = toBeSpliced;
	}

</script>

<svelte:head>
	<title>Ask Odin</title>
	<meta name="description" content="Tool for finding raid targets on Twitch" />
</svelte:head>

<section>
		{#if $loggedInStore && $channelsStore.length > 0}
			{#if $channelsTimestampStore}
				Time of last get: {$channelsTimestampStore.toLocaleString()}
			{/if}
			{#each $channelsStore as stream}
				<LiveStreamItem bind:stream={stream} on:delete={handleStreamDelete} on:select={handleSelectStream} />
			{/each}
		{/if}

	    {#if $loggedInStore && $channelsStore.length === 0}
			Controls are in the the tool bar at the bottom.<br>
			Specify filters for channels to get.<br>
			Get a list of followed channels.<br>
			Copy selected channels in markdown (Discord) code block.
	    {/if}

		{#if !$loggedInStore}
			Log in to use
		{/if}

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
