<script lang="ts">
    import type  { LiveStream } from '$lib/types/livestream';
    import { Trash2Icon } from 'svelte-feather-icons';
    import { createEventDispatcher } from 'svelte';

    import ConfirmationDialog from './ConfirmationDialog.svelte';

    export let stream: LiveStream;

    const dispatch = createEventDispatcher();

    function deleteStream() {
        dispatch('delete', {
            name: stream.name
        });
    }

    function selectStream() {
        dispatch('select', {
            name: stream.name
        });
    }

    let deleteDialogVisible = false;
    let deleteDialogText = 'Remove channel from list?';

    function showDeleteDialog() {
        deleteDialogVisible = true;
    }

    function onDeleteConfirm() {
        deleteStream();
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
        <input type="checkbox" bind:checked={stream.selected} on:change={selectStream}>
    </div>
            <div class="stream-name">
                <a href={stream.link} target="_blank">{stream.name}</a>
            </div>
            <div class="stream-duration">
                {stream.runningTime}
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
</div>
{/if}

<ConfirmationDialog bind:showDialog={deleteDialogVisible} on:confirm={onDeleteConfirm} bind:dialogText={deleteDialogText}/>


<style>
    .stream-card {
        width: 100%;
        border: 1px solid black;
        border-radius: 4px;
        padding: 4px;
        margin: 4px;
        display: grid;
        grid-template-columns: [selector] 3rem [name] auto [duration] 4rem [viewers] 4rem [delete] 3rem [end];
        grid-template-rows: [info] 2rem [title] 2rem [bottom];

    }

    .stream-selector {
/*         width: 2rem; */
        display: flex;
        padding: 0.5rem;
        grid-column-start: selector;
        grid-column-end: name;
        grid-row-start: info;
        grid-row-end: bottom;
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
        grid-column-start: name;
        grid-column-end: duration;
        grid-row-start: info;
        grid-row-end: title;
    }

    .stream-duration {
/*         display: inline-block; */
        grid-column-start: duration;
        grid-column-end: viewers;
        grid-row-start: info;
        grid-row-end: title;
    }

    .stream-viewers {
/*         display: inline-block; */
        grid-column-start: viewers;
        grid-column-end: delete;
        grid-row-start: info;
        grid-row-end: title;
    }

    .stream-title {
/*     display:flex; */
        font-size: 0.8rem;
/*         text-wrap: nowrap; */

        overflow: hidden;
/*        width: 100%;
  min-height: 0;
  min-width: 0;*/
        grid-column-start: name;
        grid-column-end: delete;
        grid-row-start: title;
        grid-row-end: bottom;
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
        grid-column-start: delete;
        grid-column-end: end;
        grid-row-start: info;
        grid-row-end: bottom;
    }

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
