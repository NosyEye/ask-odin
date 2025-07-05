import { writable } from 'svelte/store';

export const confirmationDialogStore = writable({showDialog: false, confirmCallback: null});
export const noteDialogStore = writable({showDialog: false, note: '', confirmCallback: null});
