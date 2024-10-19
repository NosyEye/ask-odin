import { writable } from 'svelte/store';

export const confirmationDialogStore = writable({showDialog: false, confirmCallback: null});
