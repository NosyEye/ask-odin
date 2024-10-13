<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

	export let dialogText: string;

	export let buttonText: string;

	export let timeSeconds: number;

	let timerText = `${timeSeconds} seconds`;

	let currentTime = timeSeconds;
	let timer;
	function startTimer() {
		timer = setInterval(() => {
			currentTime -= 1;
			timerText = `${currentTime} seconds`;

			if (currentTime === 0) {
				onTimeExpired();
			}
		}, 1000);
	}

	function onTimeExpired() {
		clearInterval(timer);
		dispatch('timeExpired');
	}

	function close() {
		clearInterval(timer);
		dispatch('close');
	}

	onMount(() => {
		currentTime = timeSeconds;
		timerText = `${timeSeconds} seconds`;
		startTimer();
	});
</script>

<div class="dialog">
{dialogText}
<br>
{timerText}
<br>
<div class="dialog-buttons">
	<button on:click={close}>{buttonText}</button>
</div>
</div>

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
