<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

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

	nav {
		display: flex;
		justify-content: center;
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

	.title {
		height: 3em;
        line-height: 3.0em;
	}

	.title a {
		text-decoration: none;
		color: #fff;
	}
</style>
