<script lang='ts'>
	// import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import {requestTwitchAuth, processTwitchAuth} from '$lib/auth';
	import { onMount } from 'svelte';
	import { getStreams } from '$lib/twitch-service';

	import LiveStreamItem from './LiveStreamItem.svelte';

	onMount(() => {
		processTwitchAuth();
	});


	let streamTextBlock  = '';

	let maxMinutes = 160;
	let minViewers = 0;
	let maxViewers = 3000;
	let minutesToRaid = 30;

	let streams = [];

	async function getRaidTargets() {
		streams = await getStreams('Music', maxMinutes, minViewers, maxViewers, minutesToRaid);
		streamTextBlock = '';
		for (let stream of streams) {
			streamTextBlock += stream.name.padEnd(25, ' ') + stream.runningTime + ' (' + stream.viewers + ')\n';

		}
	}

</script>

<svelte:head>
	<title>Ask Odin</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>

		Ask Odin
	</h1>

		<button on:click={getRaidTargets}>get followed streams</button>
		<pre>{streamTextBlock}</pre>
<!--		{#each streams as stream}
			<LiveStreamItem bind:stream={stream}/>
		{/each}-->
<!--	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>-->

<!-- 	<Counter /> -->
</section>
<section>
		<label>Max minutes streamed<input type="range" min="0" max="300" step="20" bind:value={maxMinutes}></label>
		{maxMinutes}
		<label>Min viewers<input type="range" min="0" max="300" step="10" bind:value={minViewers}></label>
		{minViewers}
		<label>Max viewers<input type="range" min="0" max="3000" step="100" bind:value={maxViewers}></label>
		{maxViewers}
		<label>Minutes to raid<input type="range" min="0" max="60" step="5" bind:value={minutesToRaid}></label>
		{minutesToRaid}
</section>

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

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
