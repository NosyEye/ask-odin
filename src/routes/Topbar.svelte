<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import AuthButton from './AuthButton.svelte';
	import Profile from './Profile.svelte';

	import { HomeIcon, HelpCircleIcon } from 'svelte-feather-icons';

    import { get } from 'svelte/store';
    import { loggedInStore } from '$lib/stores/authStore';

	let loggedIn = get(loggedInStore);
	loggedInStore.subscribe((status) => {
        loggedIn = status;
	});

</script>

<div class="topbar">
	<div class="left-corner">
		<nav>
		    {#if $page.url.pathname === `${base}/`}
			<div class="nav-icon"><a href="{base}/about"><HelpCircleIcon/></a></div>
			{:else}
			<div class="nav-icon"><a href="{base}/"><HomeIcon/></a></div>
			{/if}
		</nav>
	</div>

	<div class="title">
		<a href="{base}/"><b>Ask Odin</b></a>
	</div>

	<div class="corner">
		    {#if loggedIn}
			<Profile/>
			{:else}
			<AuthButton/>
			{/if}
	</div>
</div>

<style>
	.topbar {
		z-index: 10000;
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #000;
		color: #fff;
		display: flex;
		justify-content: space-between;
	}

	.corner {
		position: relative;
		width: 8em;
		height: 3em;
	}

	.left-corner {
		position: relative;
		width: 3em;
		height: 3em;
		padding-right: 5em;
	}

	.nav-icon {
		position: relative;
		top: 0.6rem;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
/* 		--background: rgba(255, 255, 255, 0.7); */
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
 		color: #fff;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
/* 		color: var(--color-theme-1); */
	}

	.title {
		height: 3em;
        line-height: 3.0em;
	}

	.title a {
		text-decoration: none;
		color: #fff;
	}
</style>
