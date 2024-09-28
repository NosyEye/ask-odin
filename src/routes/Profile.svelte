<script lang="ts">
	import { logged_in, current_user, logout } from '$lib/auth';
    import { get } from 'svelte/store';

	let loggedIn = get(logged_in);
	logged_in.subscribe((status) => {
        loggedIn = status;
	});

	let currentUser = null;
	current_user.subscribe((user) => {
        currentUser = user;
	});

	let profileDropdownOpen: boolean = false;

	function toggleProfileDropdown() {
        profileDropdownOpen = !profileDropdownOpen;
	}

	let profileButton;

	function handleClickOutside() {
        profileDropdownOpen = false;
	}

	function clickOutside(node) {
        const handleClick = event => {
            if (node && !node.contains(event.target) && event.target != profileButton && !event.defaultPrevented) {
                node.dispatchEvent(new CustomEvent('click_outside', node));
            }
        }

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

</script>

{#if loggedIn && currentUser}
<button on:click={toggleProfileDropdown} bind:this={profileButton}>{currentUser.display_name}</button>
{/if}


{#if profileDropdownOpen}
<div class="dropdown" use:clickOutside on:click_outside={handleClickOutside}>
  <button on:click={logout}>Logout</button>
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

    .dropdown button {
        line-height: 2rem;
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
	button {
		width: 100%;
		height: 100%;
		background-color: var(--color-nav);
		color: #fff;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-nav-hover);
	}
</style>
