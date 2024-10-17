<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	export let dialogText: string;

	export let showDialog: boolean;

	function closeDialog() {
		showDialog = false;
	}

	function confirm() {
		showDialog = false;
		dispatch('confirm');
	}
</script>

{#if showDialog}
<dialog open>
{dialogText}
<br>
<div class="dialog-buttons">
	<button on:click={confirm}>Yes</button>
	<button on:click={closeDialog}>No</button>
</div>
</dialog>
{/if}

<style>

	dialog {
		position: fixed;

		top: 10em;

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
