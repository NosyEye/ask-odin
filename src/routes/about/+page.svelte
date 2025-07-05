<script lang="ts">
	import { SlidersIcon, RefreshCcwIcon, CopyIcon, Trash2Icon, EditIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
	<title>Ask Odin?</title>
	<meta name="description" content="About" />
</svelte:head>

<div class="about-text">
	<h1>What is?</h1>

	<p>
		Has this ever happened to you: <br>
		You mod a Twitch channel, and it's time to find one or more channels to suggest as raid targets for your streamer. You are a diligent mod, so you have a large list of followed channels for these occations. But, oh no! You were a little too prepared and your list of followed channels has grown unmanagable. Is this channel about to end as well? Only want a specific category? Want a specific size viewer-wise? <br>
		Well, now you can! Just ask Odin! (get it? because raids and vikings and stuff, hehe... heh)
	</p>

	<h2>Usage</h2>
	<p>
		To use, log in with your Twitch account. The app will fetch a list containing live streams from your followed channels. It refreshes automatically every minute.
	</p>
	<dl>
		<dt>Raid timer up top</dt>
		<dd>Set how many minutes until you are raiding. Will automatically count down.</dd>
		<dt><SlidersIcon/> Filters</dt>
		<dd>
			Filter the list of streams by:
			<ul>
				<li>Max minutes streamed; duration at time of raid (i.e. includes the raid timer value), rounded to nearest 5 for readability. Set to max for no limit.</li>
				<li>Minimum viewers</li>
				<li>Maximum viewers. Set to max for no limit.</li>
				<li>Category. Freetext filter, not case-sensitive. Defaults to Music because that is the best category.</li>
			</ul>
			Filters are remembered by the browser across visits.
		</dd>
		<dt>Select streams</dt>
		<dd>Select streams for copy by clicking the boxes to the left of their names</dd>
		<dt><RefreshCcwIcon/> Reset</dt>
		<dd>Reset the list by refreshing it, clearing any selections and notes, and restoring removed streams (but filters are kept).</dd>
		<dt><CopyIcon/> Copy </dt>
		<dd>Copy the visible, selected streams in a markdown codeblock (useful for sharing in Discord). Includes stream duration and viewer count.</dd>
		<dt><EditIcon/> Note </dt>
		<dd>Add a note for the stream. This will be included in the copied list.</dd>
		<dt><Trash2Icon/> Delete </dt>
		<dd>Remove the stream from the list.</dd>
	</dl>
	<p>
		The app is completely client-side, i.e. any data handled by the app is kept locally in your browser.
		Logging in with Twitch gives the app permission to get your username and your followed channels.
	</p>
	<p>
		Code can be found here: <a href="https://github.com/NosyEye/ask-odin">https://github.com/NosyEye/ask-odin</a>
	</p>
</div>


<style>
h1,
h2,
p {
	font-weight: 400;
}
p {
	line-height: 1.5;
	text-align: justify;
}
	h1 {
		font-size: 2rem;
		text-align: center;
	}
	.about-text {
		display: flex;
		max-width: 48rem;
		flex: 0.6;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		color: var(--color-about-text);
	}

</style>
