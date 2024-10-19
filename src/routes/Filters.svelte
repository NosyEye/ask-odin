<script lang="ts">
	import { filterStore, showFiltersStore } from '$lib/stores/filterStore';
	import { loggedInStore } from '$lib/stores/authStore';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { XIcon } from 'svelte-feather-icons';

	function closeFilters(){
		$showFiltersStore = false;
	}

	const minutesToRaidUpdateInterval = 1000 * 60;
	setInterval(() => {
		const newMinutes = $filterStore.minutesToRaid - 1;
		$filterStore.minutesToRaid = newMinutes > 0 ? newMinutes : 0;
	}, minutesToRaidUpdateInterval);

	$: maxMinutes = $filterStore.maxMinutesStreamed === 300 ? 'No limit' : $filterStore.maxMinutesStreamed;
	$: maxViewers = $filterStore.maxViewers === 3000 ? 'No limit' : $filterStore.maxViewers;

</script>
{#if $loggedInStore && $page.url.pathname === `${base}/`}
<div class="raid-timer">
	Raid in {$filterStore.minutesToRaid} minutes<br>
	<input type="range" min="0" max="60" step="1" bind:value={$filterStore.minutesToRaid}>
</div>
{/if}


{#if $showFiltersStore}
<div class="filters-box">
	<button class="close-button" on:click={closeFilters}><XIcon/></button>
	<div class="filter">
		<label>Category<br><input type="text" bind:value={$filterStore.category}></label>
	</div>
	<div class="filter">
		<label>Max minutes streamed<br><input type="range" min="0" max="300" step="20" bind:value={$filterStore.maxMinutesStreamed}></label>
		<span class="filter-value">{maxMinutes}</span>
	</div>
	<div class="filter">
		<label>Min viewers<br><input type="range" min="0" max="300" step="1" bind:value={$filterStore.minViewers}></label>
		<span class="filter-value">{$filterStore.minViewers}</span>
	</div>
	<div class="filter">
		<label>Max viewers<br><input type="range" min="0" max="3000" step="10" bind:value={$filterStore.maxViewers}></label>
		<span class="filter-value">{maxViewers}</span>
	</div>
</div>
{/if}

<style>
	.raid-timer {
		border-top: 2px solid var(--color-bar-separator);
		padding-top: 4px;
		position: fixed;
        background-color: var(--color-bar-bg);
        color: var(--color-bar-text);;
        top: 3em;
        width: 100%;
        height: 3em;
		text-align: center;
		z-index: 1000;
	}

	.raid-timer input {
		display: inline-block;
		vertical-align: middle;
	}

	@media (max-width:360px) {
		.raid-timer input {
			width:240px;
		}
	}

    @media (min-width:361px) and (max-width:480px) {
		.raid-timer input {
			width:320px;
		}
	}

	@media (min-width:481px) and (max-width:768px) {
		.raid-timer input {
			width:420px;
		}
	}

	@media (min-width:769px) {
		.raid-timer input {
			width:600px;
		}
	}

    .filters-box {
		display: flex;
		flex-direction: column;
		position: fixed;
        background: var(--color-bar-bg);
        color: var(--color-bar-text);;
		bottom: 3em;
		height: 24em;
		justify-content: center;
		align-items: center;
    }

    @media (max-width:480px) {
		.filters-box {
			width: 100%;
		}
	}

	@media (min-width:481px) {
		.filters-box {
			width: 80%;
			margin-left: 10%;
		}
	}

    @media (min-width:961px) {
		.filters-box {
			width: 50%;
			margin-left: 25%;
		}
	}

	.close-button {
		border: none;
		background: inherit;
		color: inherit;
		position: absolute;
		top: 0;
		right: 0;
		padding: 8px;
	}

	.filter {
		width: 80%;
		padding: 16px;
		text-align: center;
	}

	label {
		width:100%;
	}

	input[type="range"] {
		width: 100%;
	}

	.filter-value {
		font-weight: 1000;
	}

</style>
