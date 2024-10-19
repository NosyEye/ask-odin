<script lang="ts">
	import { requestTwitchAuth } from '$lib/auth';
    import { loggedInStore } from '$lib/stores/authStore';

</script>
{#if !$loggedInStore}
<button on:click={requestTwitchAuth}>
Log in with Twitch
</button>
{/if}

<style>
	button {
		width: 100%;
		height: 100%;
		background-color: var(--color-bar-bg);
		color: var(--color-bar-text);
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-bar-button-hover);
	}
</style>
