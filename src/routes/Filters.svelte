<script lang="ts">
	import { filterStore, showFiltersStore } from '$lib/stores/filterStore';

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

{#if $showFiltersStore}
<div class="filters-box">
		<button class="close-button" on:click={closeFilters}><XIcon/></button>
		<label>Max minutes streamed<br><input type="range" min="0" max="300" step="20" bind:value={$filterStore.maxMinutesStreamed}></label>
		{maxMinutes}
		<label>Min viewers<br><input type="range" min="0" max="300" step="10" bind:value={$filterStore.minViewers}></label>
		{$filterStore.minViewers}
		<label>Max viewers<br><input type="range" min="0" max="3000" step="100" bind:value={$filterStore.maxViewers}></label>
		{maxViewers}
		<label>Minutes to raid<br><input type="range" min="0" max="60" step="1" bind:value={$filterStore.minutesToRaid}></label>
		{$filterStore.minutesToRaid}
</div>
{/if}

<style>

    .filters-box {
		display: flex;
		flex-direction: column;
		position: fixed;
        background: #000;
        color: #fff;
		bottom: 3em;
		height: 20em;
		justify-content: center;
		align-items: center;
/* 		flex: 0.6; */
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

</style>
