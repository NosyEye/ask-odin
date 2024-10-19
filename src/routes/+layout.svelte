<script lang="ts">
	// import Header from './Header.svelte';
	import '../app.css';
	import Topbar from './Topbar.svelte';
	import Navbar from './Navbar.svelte';
	import Filters from './Filters.svelte';
	import { onMount } from 'svelte';
	import { processTwitchAuth, requestTwitchAuth } from '$lib/auth';
	import { getStreams } from '$lib/twitch-service';

	import TimedAlertDialog from './TimedAlertDialog.svelte';
    import ConfirmationDialog from './ConfirmationDialog.svelte';

	let dialogText: string = 'Twitch login expired. Re-authenticating in';
	let dialogButtonText: string = 'Abort';
	let timerSeconds = 5;

	let showTimer: boolean = false;
	function startTimer() {
		showTimer = true;
	}
	function closeTimer() {
		showTimer = false;
	}
	function authenticate(){
		requestTwitchAuth();
	}

	let loading = true;
	const streamsRefreshInterval = 1000 * 60;
	onMount(async () => {
		window.document.addEventListener('reauthenticate', () => {
			startTimer();
		});
		await processTwitchAuth();
		await getStreams();
		loading = false;
		setInterval(getStreams, streamsRefreshInterval);
	});


    let deleteDialogText = 'Remove channel from list?';
</script>

<div class="app">
	<Topbar/>
	<main>
	{#if loading}
		Loading...
	{:else}
		<slot />
	{/if}

	{#if showTimer}
		<TimedAlertDialog on:close={closeTimer} on:timeExpired={authenticate} bind:dialogText={dialogText} bind:timeSeconds={timerSeconds} bind:buttonText={dialogButtonText}/>
	{/if}
	</main>
	<ConfirmationDialog dialogText={deleteDialogText}/>
	<Filters/>
	<Navbar/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
 		padding-top: 7rem;
 		padding-bottom: 4rem;
	}
</style>
