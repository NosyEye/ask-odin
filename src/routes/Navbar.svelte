<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import AuthButton from './AuthButton.svelte';
	import Profile from './Profile.svelte';

	import { SlidersIcon, RefreshCcwIcon, CopyIcon } from 'svelte-feather-icons';
</script>

<div class="navbar">
	<div class="actions">
		{#if $page.url.pathname === `${base}/`}
		<button><div class="action-icon"><SlidersIcon/></div></button>

		<button><div class="action-icon"><RefreshCcwIcon/></div></button>

		<button><div class="action-icon"><CopyIcon/></div></button>
		{/if}
	</div>
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
	}

	button:hover {
		background: #111;
	}

	button:active {
		background: #111;
	}

</style>
