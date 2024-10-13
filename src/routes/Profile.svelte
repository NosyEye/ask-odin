<script lang="ts">
	import { logout } from '$lib/auth';
	import { userStore } from '$lib/stores/authStore';
    import { get } from 'svelte/store';

    import { loggedInStore } from '$lib/stores/authStore';

	let loggedIn = get(loggedInStore);
	loggedInStore.subscribe((status) => {
        loggedIn = status;
	});

	let currentUser = null;
	userStore.subscribe((user) => {
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
    .dropdown button {
        line-height: 2rem;
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
