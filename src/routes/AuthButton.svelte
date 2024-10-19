<script lang="ts">
	import { requestTwitchAuth, logout } from '$lib/auth';
    import { get } from 'svelte/store';
    import { loggedInStore } from '$lib/stores/authStore';

	// let loggedIn = get(loggedInStore);
	// loggedInStore.subscribe((status) => {
 //        loggedIn = status;
	// });

</script>

<!--{#if $loggedInStore}
<button on:click={logout}>
Log out
</button>
{/if}-->


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
