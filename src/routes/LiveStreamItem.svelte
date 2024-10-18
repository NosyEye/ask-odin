<script lang="ts">
    import type { LiveStream } from '$lib/types/livestream';
    import { Trash2Icon } from 'svelte-feather-icons';
    import { createEventDispatcher } from 'svelte';

    import ConfirmationDialog from './ConfirmationDialog.svelte';

    export let stream: LiveStream;

    let deleteDialogVisible = false;
    let deleteDialogText = 'Remove channel from list?';

    function showDeleteDialog() {
        deleteDialogVisible = true;
    }

    function onDeleteConfirm() {
        stream.deleted = true;
    }

</script>


{#if stream}
<!--<div class="stream-card">
    <div class="stream-selector">
        <input type="checkbox">
    </div>
    <div class="stream">
        <div class="stream-info">
            <div class="stream-name">
                <a href={stream.link} target="_blank">{stream.name}</a>
            </div>
            <div class="stream-duration">
                {stream.runningTime}
            </div>
            <div class="stream-viewers">
                {stream.viewers}
            </div>
        </div>
        <div class="stream-title">
            {stream.title}
        </div>
    </div>
</div>-->
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
            <div class="stream-title-content">
            {stream.title}
            </div>
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

<ConfirmationDialog bind:showDialog={deleteDialogVisible} on:confirm={onDeleteConfirm} bind:dialogText={deleteDialogText}/>


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

/*    .offline-text {
        position: relative;
    }*/

    .stream-card {
        position: relative;
        width: 100%;
        border: 1px solid black;
        border-radius: 4px;
        padding: 4px;
        margin: 4px;
        display: grid;
    }

    .stream-selector {
/*         width: 2rem; */
        display: flex;
        padding: 0.5rem;
    }

    input[type=checkbox] {
        transform: scale(2);
    }

    .stream {
        width: 100%;
    }

    .stream-info {
        display: flex;
        justify-content: space-between;
    }

    .stream-name {
/*         display: inline-block; */
        font-size: 1.2rem;
    }

    .stream-duration {
/*         display: inline-block; */
    }

    .stream-viewers {
/*         display: inline-block; */
    }

    .stream-title {
/*     display:flex; */
        font-size: 0.8rem;
/*         text-wrap: nowrap; */

        overflow: hidden;
/*        width: 100%;
  min-height: 0;
  min-width: 0;*/
    }

    .stream-title-content {
/*      min-height: 0;
  min-width: 0;
  word-break: normal;
        overflow: hidden;*/
    }

    .stream-delete {
        display: flex;
        padding-top: 1rem;
        color: #800020;
    }


    @media (max-width:480px) {
        .stream-card {
            grid-template-columns: [selector] 3rem [name] 4rem [viewers] auto [delete] 3rem [end];
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
            grid-column-end: delete;
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
            grid-column-end: delete;
            grid-row-start: details1;
            grid-row-end: details2;
        }

        .stream-title {
            grid-column-start: name;
            grid-column-end: delete;
            grid-row-start: details2;
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
            grid-template-columns: [selector] 3rem [name] auto [duration] 4rem [viewers] 4rem [delete] 3rem [end];
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
            grid-column-end: delete;
            grid-row-start: head;
            grid-row-end: title;
        }

        .stream-title {
            grid-column-start: name;
            grid-column-end: delete;
            grid-row-start: title;
            grid-row-end: bottom;
        }

        .stream-delete {
            grid-column-start: delete;
            grid-column-end: end;
            grid-row-start: head;
            grid-row-end: bottom;
        }
	}

/*	@media (min-width:481px) and (max-width:768px) {
		.raid-timer input {
			width:420px;
		}
	}

	@media (min-width:769px) {
		.raid-timer input {
			width:600px;
		}
	}*/


/*    .stream-card {
        width: 100%;
        border: 1px solid black;
        border-radius: 4px;
        padding: 4px;
        margin: 4px;
        display: flex;
    }

    .stream-selector {
        width: 2rem;
        display: flex;
        padding: 0.5rem;
    }

    input[type=checkbox] {
        transform: scale(2);
    }

    .stream {
        width: 100%;
    }

    .stream-info {
        display: flex;
        justify-content: space-between;
    }

    .stream-name {
        display: inline-block;
        font-size: 1.2rem;
    }

    .stream-duration {
        display: inline-block;
    }

    .stream-viewers {
        display: inline-block;
    }

    .stream-title {
    display:flex;
        font-size: 0.8rem;
        text-wrap: nowrap;
        overflow: hidden;
    }*/
</style>
