<script lang="ts">
	import { requestTwitchAuth, logged_in, logout } from '$lib/auth';
    import { get } from 'svelte/store';

	let loggedIn = get(logged_in);
	logged_in.subscribe((status) => {
        loggedIn = status;
	});

</script>

{#if loggedIn}
<button on:click={logout}>
Log out
</button>
{/if}


{#if !loggedIn}
<button on:click={requestTwitchAuth}>
Log in with Twitch
</button>
{/if}

<style>

</style>
