<script lang="ts">
	import { show_filters, max_minutes, min_viewers, max_viewers, minutes_to_raid } from '$lib/twitch-service';
	import { filterStore } from '$lib/stores/filterStore';

	import { XIcon } from 'svelte-feather-icons';

	function closeFilters(){
		show_filters.set(false);
	}

</script>

{#if $show_filters}
<div class="filters-box">
		<button class="close-button" on:click={closeFilters}><XIcon/></button>
		<label>Max minutes streamed<br><input type="range" min="0" max="300" step="20" bind:value={$max_minutes}></label>
		{$max_minutes}
		<label>Min viewers<br><input type="range" min="0" max="300" step="10" bind:value={$min_viewers}></label>
		{$min_viewers}
		<label>Max viewers<br><input type="range" min="0" max="3000" step="100" bind:value={$max_viewers}></label>
		{$max_viewers}
		<label>Minutes to raid<br><input type="range" min="0" max="60" step="5" bind:value={$minutes_to_raid}></label>
		{$minutes_to_raid}
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
