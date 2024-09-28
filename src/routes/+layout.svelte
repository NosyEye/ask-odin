<script>
	// import Header from './Header.svelte';
	import '../app.css';
	import Topbar from './Topbar.svelte';
	import Navbar from './Navbar.svelte';
	import Filters from './Filters.svelte';
	import { onMount } from 'svelte';
	import { processTwitchAuth} from '$lib/auth';
	onMount(() => {
		processTwitchAuth();
	});


</script>

<div class="app">
<!-- 	<Header /> -->
	<Topbar/>
	<main>
		<slot />
	</main>

	<footer>

	</footer>

	<Filters/>
	<Navbar/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
 		padding-top: 4rem;
 		padding-bottom: 4rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
