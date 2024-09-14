<script lang="ts">
    import type  { LiveStream } from '$lib/types/livestream';

    export let stream: LiveStream;

</script>


{#if stream}
<div class="stream-card">
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
</div>
{/if}




<style>
    .stream-card {
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
    }
</style>
