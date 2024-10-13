<script lang='ts'>
	// import Counter from './Counter.svelte';
	// import {requestTwitchAuth, processTwitchAuth} from '$lib/auth';
	// import { onMount } from 'svelte';
	import { getStreams } from '$lib/twitch-service';
	import { channelsStore, channelsTimestampStore } from '$lib/stores/channelsStore';
	import { get } from 'svelte/store';

	import LiveStreamItem from './LiveStreamItem.svelte';
	import { loggedInStore } from '$lib/stores/authStore';

	// onMount(() => {
	// 	processTwitchAuth();
	// });

	// let streams = get(streams_store);
	// streams_store.subscribe((_streams) => {
	// console.log(_streams)
 //        streams = _streams;
	// });

	let streamTextBlock  = '';

	let maxMinutes = 160;
	let minViewers = 0;
	let maxViewers = 3000;
	let minutesToRaid = 30;

	// let streams = [];

	async function getRaidTargets() {
		//streams = await getStreams('Music', maxMinutes, minViewers, maxViewers, minutesToRaid);
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

// 	import TimedAlertDialog from './TimedAlertDialog.svelte';
//
// 	let dialogText: string = 'Closing in';
// 	let dialogButtonText: string = 'Stop';
// 	let timerSeconds = 5;
//
// 	let showTimer: boolean = false;
// 	function startTimer() {
// 		showTimer = true;
// 	}
// 	function closeTimer() {
// 		showTimer = false;
// 	}
//
// 	onMount(
// 	window.document.addEventListener('reauthenticate', () => {
// 		startTimer();
// 	});
</script>

<svelte:head>
	<title>Ask Odin</title>
	<meta name="description" content="Tool for finding raid targets on Twitch" />
</svelte:head>

<section>
<!-- 		<button on:click={getRaidTargets}>Get followed streams</button> -->
<!-- 		<pre>{streamTextBlock}</pre> -->

<!-- 		<button on:click={copySelectedStreamsForDiscord}>Copy selected for Discord</button> -->
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
<!--		<button on:click={startTimer}>start timer</button>-->
<!--		{#if showTimer}
			<TimedAlertDialog on:close={closeTimer} bind:dialogText={dialogText} bind:timeSeconds={timerSeconds} bind:buttonText={dialogButtonText}/>
		{/if}-->
</section>
<!--<section>
		<label>Max minutes streamed<input type="range" min="0" max="300" step="20" bind:value={maxMinutes}></label>
		{maxMinutes}
		<label>Min viewers<input type="range" min="0" max="300" step="10" bind:value={minViewers}></label>
		{minViewers}
		<label>Max viewers<input type="range" min="0" max="3000" step="100" bind:value={maxViewers}></label>
		{maxViewers}
		<label>Minutes to raid<input type="range" min="0" max="60" step="5" bind:value={minutesToRaid}></label>
		{minutesToRaid}
</section>-->

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
