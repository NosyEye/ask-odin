<script lang="ts">
	import { logged_in } from '$lib/auth';
    import { get } from 'svelte/store';

	let loggedIn = get(logged_in);
	logged_in.subscribe((status) => {
        loggedIn = status;
	});

</script>

{#if loggedIn}
<div class="user">
    logged in
</div>
{/if}



<style>
/*    .user {
        color: #fff;
    }*/
</style>
