<script lang='ts'>
	import { getStreams } from '$lib/twitch-service';
	import { streamsStore } from '$lib/stores/streamsStore';

	import LiveStreamItem from './LiveStreamItem.svelte';
	import { loggedInStore } from '$lib/stores/authStore';

</script>

<svelte:head>
	<title>Ask Odin</title>
	<meta name="description" content="Tool for finding raid targets on Twitch" />
</svelte:head>

<section>
		{#if $loggedInStore && $streamsStore.length > 0}
			{#each $streamsStore as stream}
				{#if !stream.filteredOut && !stream.deleted}
					<LiveStreamItem bind:stream={stream}/>
				{/if}
			{/each}
		{/if}

	    {#if $loggedInStore && $streamsStore.length === 0}
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
