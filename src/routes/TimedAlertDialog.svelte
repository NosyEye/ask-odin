<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

    let dialog;
	export let dialogText: string;

	export let buttonText: string;

	export let timeSeconds: number;

    onMount(() => {
		window.document.addEventListener('reauthenticate', () => {
			currentTime = timeSeconds;
			timerText = `${timeSeconds} seconds`;
			startTimer();
		});
	});

    const dispatch = createEventDispatcher();

	let timerText = `${timeSeconds} seconds`;

	let currentTime = timeSeconds;
	let timer;
	function startTimer() {
		dialog.showModal();
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
		dialog.close();
	}
</script>

<dialog bind:this={dialog}>
{dialogText}
<br>
{timerText}
<br>
<div class="dialog-buttons">
	<button on:click={close}>{buttonText}</button>
</div>
</dialog>

<style>

	dialog {
		position: fixed;

		padding: 32px 32px 16px;

		background-color: var(--color-bar-bg);
		color: var(--color-bar-text);

		text-align: center;
		font-size: 1.2em;
	}

	dialog::backdrop {
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(4px);
	}

	.dialog-buttons {
		display: flex;
		justify-content: space-evenly;
		padding: 0.5em;
	}

	button {
		width: 5rem;
		height: 3rem;
		text-align: center;
		background-color: var(--color-bar-bg);
		color: var(--color-bar-text);
		border: none;
		border-radius: 2px;
	}

	button:hover {
		background-color: var(--color-bar-button-hover);
	}

	button:active{
		background-color: var(--color-bar-button-hover);
	}
</style>
