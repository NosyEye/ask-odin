<script lang="ts">
	import { logged_in, current_user } from '$lib/auth';
    import { get } from 'svelte/store';

	let loggedIn = get(logged_in);
	logged_in.subscribe((status) => {
        loggedIn = status;
	});

	let currentUser = null;
	current_user.subscribe((user) => {
        currentUser = user;
	});

</script>

{#if loggedIn && currentUser}
<div class="user">
<span>{currentUser.display_name}</span>
</div>
{/if}



<style>
    .user {
        background-color: var(--color-nav);
        color: white;
/*         height: 100%; */
        width: 100%;
        text-align: center;
        line-height: 3.0em;

    }

/*    .status {
    display: inline-block;
        vertical-align: middle;
    }*/
    span {
        display: inline-block;
        vertical-align: middle;
        line-height: 1.0em;
    }
</style>
