<script lang="ts">
    import { confirmationDialogStore } from '$lib/stores/dialogStore';

    let dialog;

	export let dialogText: string;

	function handleDialogChanges() {
		if (dialog) {
			if ($confirmationDialogStore.showDialog) {
				dialog.showModal();
			} else {
				dialog.close();
			}
		}
	}

	function closeDialog() {
		$confirmationDialogStore = {
			showDialog: false,
			confirmCallback: null
		}
	}

	function confirm() {
		$confirmationDialogStore.confirmCallback();
		closeDialog();
	}

	$: {
		if ($confirmationDialogStore) handleDialogChanges();
	}
</script>

<dialog bind:this={dialog}>
{dialogText}
<br>
<div class="dialog-buttons">
	<button on:click={confirm}>Yes</button>
	<button on:click={closeDialog}>No</button>
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
