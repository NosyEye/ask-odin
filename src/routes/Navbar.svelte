<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import AuthButton from './AuthButton.svelte';
	import Profile from './Profile.svelte';
	import { getStreams, copySelectedStreamsForDiscord, show_filters } from '$lib/twitch-service';

	import { SlidersIcon, RefreshCcwIcon, CopyIcon } from 'svelte-feather-icons';

	import { logged_in } from '$lib/auth';

	async function getTheStreams(){
		await getStreams('Music');
		show_filters.set(false);
	}

</script>

<div class="navbar">
	{#if $logged_in}
	<div class="actions">
		{#if $page.url.pathname === `${base}/`}
		<button on:click={() => $show_filters = !$show_filters}><div class="action-icon"><SlidersIcon/></div></button>

		<button on:click={getTheStreams}><div class="action-icon"><RefreshCcwIcon/></div></button>

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
