<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import github from '$lib/images/github.svg';

	import AuthButton from './AuthButton.svelte';
	import Profile from './Profile.svelte';
	import { copySelectedStreamsForDiscord, getStreamsAndReset } from '$lib/twitch-service';
	import { showFiltersStore } from '$lib/stores/filterStore';

	import { SlidersIcon, RefreshCcwIcon, CopyIcon } from 'svelte-feather-icons';

	import { loggedInStore } from '$lib/stores/authStore';

	async function reset() {
		await getStreamsAndReset();
		$showFiltersStore = false;
	}

</script>

<div class="navbar">
	{#if $loggedInStore}
	<div class="actions">
		{#if $page.url.pathname === `${base}/`}
		<button on:click={() => $showFiltersStore = !$showFiltersStore}><div class="action-icon"><SlidersIcon/></div></button>

		<button on:click={reset}><div class="action-icon"><RefreshCcwIcon/></div></button>

		<button on:click={copySelectedStreamsForDiscord}><div class="action-icon"><CopyIcon/></div></button>
		{/if}
	</div>
	{/if}
</div>

<style>
	.navbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #000;
		color: #fff;
		display: flex;
		justify-content: center;
		height: 3em;
		z-index: 1000;
	}

	.action-icon {
		position: relative;
		top: 0.6rem;
	}

	.actions {
		display: flex;
		justify-content: space-between;
	}

	@media (max-width:480px) {
		.actions {
			width: 60%;
		}
	}

	@media (min-width:481px) {
		.actions {
			width: 30%;
		}
	}

	button {
		border: none;
		background: inherit;
		color: inherit;
		display: flex;
		justify-content: center;
		height: 3em;
		width: 3em;
		cursor: pointer;
	}

	button:hover {
		background: var(--color-nav-hover);
	}

	button:active {
		background: var(--color-nav-hover);
	}

</style>
