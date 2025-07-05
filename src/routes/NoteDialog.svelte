<script lang="ts">
    import { noteDialogStore } from '$lib/stores/dialogStore';

    let dialog;
    let note;

	export let dialogText: string;

	function handleDialogChanges() {
		if (dialog) {
			if ($noteDialogStore.showDialog) {
				note = $noteDialogStore.note;
				dialog.showModal();
			} else {
				dialog.close();
			}
		}
	}

	function closeDialog() {
	    note = '';
		$noteDialogStore = {
			showDialog: false,
			note: '',
			confirmCallback: null
		}
	}

	function confirm() {
		$noteDialogStore.confirmCallback(note);
		closeDialog();
	}

	$: {
		if ($noteDialogStore) handleDialogChanges();
	}
</script>

<dialog bind:this={dialog}>
{dialogText}
<p>
<input bind:value={note}>
<p>
<div class="dialog-buttons">
	<button on:click={confirm}>Save</button>
	<button on:click={closeDialog}>Cancel</button>
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
