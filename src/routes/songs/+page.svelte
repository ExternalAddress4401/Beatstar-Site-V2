<script>
	import Input from '$lib/components/Input.svelte';
	import SongCard from '$lib/components/SongCard.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';

	let { data } = $props();

	const songs = $state(data.songs);
	let filteredSongs = $state(songs);
</script>

<Wrapper center={true}>
	<Input
		onChange={(searchTerm) =>
			(filteredSongs = songs.filter((song) => song.title.toLowerCase().includes(searchTerm)))}
	/>
	<div class="songGrid">
		{#each filteredSongs as song}
			<SongCard title={song.title} />
		{/each}
	</div>
</Wrapper>

<style>
	.songGrid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
</style>
