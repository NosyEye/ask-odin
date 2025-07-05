<script lang="ts">
    import type { LiveStream } from '$lib/types/livestream';
    import { Trash2Icon, EditIcon } from 'svelte-feather-icons';
    import { confirmationDialogStore, noteDialogStore } from '$lib/stores/dialogStore';
    export let stream: LiveStream;

    function showDeleteDialog() {
        $confirmationDialogStore = {
            showDialog: true,
            confirmCallback: () => {
                    stream.deleted = true;
                }
        };
    }

    function showNoteDialog() {
        $noteDialogStore = {
            showDialog: true,
            note: stream.note,
            confirmCallback: (note) => {
                    stream.note = note;
                }
        };
    }
</script>


{#if stream}
<div class="stream-card">
    <div class="stream-selector">
        <input type="checkbox" bind:checked={stream.selected}>
    </div>
            <div class="stream-name">
                <a href={stream.link} target="_blank">{stream.name}</a>
            </div>
            <div class="stream-duration">
                {stream.adjustedRunningTimeString}
            </div>
            <div class="stream-viewers">
                {stream.viewers}
            </div>
        <div class="stream-title">
            <b>{stream.category}</b>:
            {stream.title}
        </div>
        <div class="stream-note">
            <button on:click={showNoteDialog}><EditIcon/></button>
        </div>
        <div class="stream-delete">
            <button on:click={showDeleteDialog}><Trash2Icon/></button>
        </div>
    {#if stream.offline}
    <div class="offline-overlay">
        <div class="offline-text">OFFLINE</div>
    </div>
    {/if}
</div>
{/if}

<style>
    .offline-overlay {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 2.4em;
        font-size: 2em;
        background-color: rgba(0,0,0,0.5);
        color: #FFF;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .stream-card {
        position: relative;
        width: 100%;
        border: 1px solid var(--color-card-border);
        border-radius: 4px;
        padding: 4px;
        margin: 4px;
        display: grid;
        background-color: var(--color-card-bg);
    }

    .stream-selector {
        display: flex;
        padding-right: 0.2rem;
    }

    input[type=checkbox] {
        transform: scale(2);
    }

    .stream-name a {
        font-size: 1.2rem;
        font-weight: 1000;
        color: var(--color-card-name);
    }

    .stream-duration {
        font-weight: 600;
        color: var(--color-card-details);
    }

    .stream-viewers {
        font-weight: 600;
        color: var(--color-card-details);
    }

    .stream-title {
        font-size: 0.8rem;
        overflow: hidden;
        color: var(--color-card-details);
    }

    .stream-delete button, .stream-note button {
        height: 100%;
        width: 100%;
        background-color: inherit;
        color: var(--color-card-name);
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .stream-delete button:hover, .stream-note button:hover {
        background-color: var(--color-card-button-hover);
    }

    .stream-delete button:active, .stream-note button:active {
        background-color: var(--color-card-button-hover);
    }

    input[type=checkbox] {
        appearance: none;
        position: relative;
        display: block;
        background-color: var(--color-bar-bg);
        height: 1rem;
        width: 1rem;
        cursor: pointer;
        margin: auto;
        border-radius: 4px;
    }

    input[type=checkbox]:hover {
        background-color: var(--color-bar-button-hover);
    }

    input[type=checkbox]:checked {
        background-color: var(--color-bar-button-hover);
    }

    input[type=checkbox]::before {
        content: '';
        position: absolute;
        display: none;
        background-color: var(--color-card-name);
        height: 0.5rem;
        width: 0.5rem;
        top: 0.25rem;
        left: 0.25rem;
        border-radius: 2px;
    }

    input[type=checkbox]:checked::before {
        display: block;

    }

    @media (max-width:480px) {
        .stream-card {
            grid-template-columns: [selector] 3rem [name] 4rem [viewers] auto [note] 3rem [delete] 3rem [end];
            grid-template-rows: [head] 2rem [details1] 1.5rem [details2] 2rem [bottom];
        }

        .stream-selector {
            grid-column-start: selector;
            grid-column-end: name;
            grid-row-start: head;
            grid-row-end: bottom;
        }

        .stream-name {
            grid-column-start: name;
            grid-column-end: note;
            grid-row-start: head;
            grid-row-end: details1;
        }

        .stream-duration {
            grid-column-start: name;
            grid-column-end: viewers;
            grid-row-start: details1;
            grid-row-end: details2;
        }

        .stream-viewers {
            grid-column-start: viewers;
            grid-column-end: note;
            grid-row-start: details1;
            grid-row-end: details2;
        }

        .stream-title {
            grid-column-start: name;
            grid-column-end: note;
            grid-row-start: details2;
            grid-row-end: bottom;
        }

        .stream-note {
            grid-column-start: note;
            grid-column-end: delete;
            grid-row-start: head;
            grid-row-end: bottom;
        }

        .stream-delete {
            grid-column-start: delete;
            grid-column-end: end;
            grid-row-start: head;
            grid-row-end: bottom;
        }
	}

    @media (min-width:480px) {
        .stream-card {
            grid-template-columns: [selector] 3rem [name] auto [duration] 4rem [viewers] 4rem [note] 3rem [delete] 3rem [end];
            grid-template-rows: [head] 2rem [title] 2rem [bottom];
        }

        .stream-selector {
            grid-column-start: selector;
            grid-column-end: name;
            grid-row-start: head;
            grid-row-end: bottom;
        }

        .stream-name {
            grid-column-start: name;
            grid-column-end: duration;
            grid-row-start: head;
            grid-row-end: title;
        }

        .stream-duration {
            grid-column-start: duration;
            grid-column-end: viewers;
            grid-row-start: head;
            grid-row-end: title;
        }

        .stream-viewers {
            grid-column-start: viewers;
            grid-column-end: note;
            grid-row-start: head;
            grid-row-end: title;
        }

        .stream-title {
            grid-column-start: name;
            grid-column-end: note;
            grid-row-start: title;
            grid-row-end: bottom;
        }

        .stream-note {
            grid-column-start: note;
            grid-column-end: delete;
            grid-row-start: head;
            grid-row-end: bottom;
        }

        .stream-delete {
            grid-column-start: delete;
            grid-column-end: end;
            grid-row-start: head;
            grid-row-end: bottom;
        }
	}
</style>
