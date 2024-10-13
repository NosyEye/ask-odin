<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

	export let dialogText: string;

	export let buttonText: string;

	let showDialog: boolean = true;

	export let timeSeconds: number;

	let timerText = `${timeSeconds} seconds`;

	let currentTime = timeSeconds;
	function startTimer() {
		const timer = setInterval(() => {
			currentTime -= 1;
			timerText = `${currentTime} seconds`;

			if (currentTime === 0) {
				onTimeExpired();
				clearInterval(timer);
			}
		}, 1000);
	}

	function onTimeExpired() {
		dispatch('timeExpired');
		close();
	}

	function closeDialog() {
		showDialog = false;
	}

	function close() {
		showDialog = false;
		dispatch('close');
	}

	onMount(() => {
		currentTime = timeSeconds;
		timerText = `${timeSeconds} seconds`;
		startTimer();
	});
</script>

{#if showDialog}
<div class="dialog">
{dialogText}
<br>
{timerText}
<br>
<div class="dialog-buttons">
	<button on:click={close}>{buttonText}</button>
</div>
</div>
{/if}

<style>

	.dialog {
		position: fixed;

		padding: 30px;

		background-color: #000;
		color: #FFF;

		text-align: center;
		font-size: 1.2em;
	}

	.dialog-buttons {
		display: flex;
		justify-content: space-evenly;
		padding: 0.5em;
	}

	button {
		width: 3em;
		text-align: center;
	}
</style>
