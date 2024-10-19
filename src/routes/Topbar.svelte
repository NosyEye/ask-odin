<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import AuthButton from './AuthButton.svelte';
	import Profile from './Profile.svelte';

	import { HomeIcon, HelpCircleIcon } from 'svelte-feather-icons';

    import { loggedInStore } from '$lib/stores/authStore';

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
		    {#if $loggedInStore}
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
		background-color: var(--color-bar-bg);
		color: var(--color-bar-text);
		display: flex;
		z-index: 2000;
	}

	@media (min-width: 601px) {
		.topbar {
			justify-content: space-between;
		}

		.left-corner {
			width: 3em;
			padding-right: 5em;
		}


		.title {
			position: absolute;
			width: 20%;
			margin-left: 40%;
		}
	}

	@media (max-width: 600px) {
		.left-corner {
			width: 3em;
		}


		.title {
			position: absolute;
			width: 30%;
			margin-left: 10%;
		}
	}


	.corner {
		position: absolute;
		width: 14em;
		height: 3em;
		right: 0;
	}

	.left-corner {
		position: relative;
		height: 3em;
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
 		color: var(--color-bar-text);;
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
        text-align: center;
	}

	.title a {
		color: var(--color-bar-text);;
	}
</style>
